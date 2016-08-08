/*global $ */

var Application = Application || {};

;(function(App) {
	'use strict';

	function AppManager() {
		this.userManager = {};
	}

	/**
	 * run when web loaded
	 * check localStorage to generate random data
	 * get all users from localStorage and view to browser
	 * add event for needed items
	 */
	AppManager.prototype.appStart = function appStart() {
		// check whether localStorage has saved users or not
		// if not, it will generate random 50 users and save them to localStorage
		if (!localStorage.getItem('users')) {
			var us = new Application.UserStorage();
			us.generateUserData(50);
		}

		this.userManager = new App.UserManager();

		this.userManager.viewAllUser(this.userManager);
		addEvent(this);
	};

	/**
	 * add click event for view all user area
	 * add click event for submit button of add-edit form
	 * @param {Object} thisObj
	 */
	function addEvent(thisObj) {
		// add click event for all a tag in #view-all-user
		$('#view-all-user').on('click', 'a', function(event) {
			event.preventDefault();

			var clickedNode = $(event.target);
			var userNode = $(this).parentsUntil('tr').parent();
			var nodeId = userNode.attr('data-id');

			if (clickedNode.hasClass('delete')) {
				// if delete user
				thisObj.userManager.deleteUser(userNode, nodeId);
			}

			if (clickedNode.hasClass('edit')) {
				// if edit user
				var index = thisObj.userManager.findIndexById(nodeId);
				if (index === -1) {
					window.alert(App.USER_DOES_NOT_EXIST_MSG);
					return;
				}

				thisObj.userManager.viewEditUser(thisObj.userManager.listUsers[index]);
			}
		});

		// add click event for add/edit an user button
		$('#add-edit-user').click(function(event) {
			event.preventDefault();
			if (checkFormInfo()) {
				return;
			}

			var id = $('#userId').val();
			if (!isNaN(parseInt(id))) {
				thisObj.userManager.editUser(id);
			} else {
				thisObj.userManager.addUser();
			}

			resetForm();
		});

		// add submit event for search form
		$('#search-form').submit(function(event) {
			event.preventDefault();
			var searchKey = $('#search-text').val();
			var searchResult = thisObj.userManager.findUserByName(searchKey);
			displaySearchMessage(thisObj, searchKey, searchResult);
			displaySearchResult(searchResult);
		});

	}

	/**
	 * display search result message
	 * and handle for close search mode
	 */
	function displaySearchMessage(thisObj, searchKey, searchResult) {
		$('#close-search').remove();
		var searchResultInfoNode = ['<p id="close-search" class="text-success">',
			'There ',
			searchResult.length > 1 ? 'are ' : 'is ',
			searchResult.length,
			' result',
			searchResult.length > 1 ? 's' : '',
			' of "',
			searchKey,
			'". Click here to exit search',
			'</p>'];
		$(searchResultInfoNode.join('')).insertAfter($('#all-user-header'));

		$('#close-search').click(function() {
			$('#close-search').remove();
			$('#search-text').val('');
			$('#view-all-user').empty();
			thisObj.userManager.viewAllUser(thisObj.userManager);
		});
	}

	/**
	 * display all user in searchResult to #view-all-user
	 */
	function displaySearchResult(searchResult) {
		$('#view-all-user').empty();
		_.forEach(searchResult, function(user) {
			var userNode = user.viewUser();
			userNode.appendTo($('#view-all-user'));
		});
	}

	/**
	 * check whether all data is inputted or not
	 * if not, the warning message will be displayed
	 */
	function checkFormInfo() {
		if ($('#userName').val() === ''
				|| $('#userAddress').val() === ''
				|| $('#userEmail').val() === '') {
			if ($('h4.text-danger').length === 0) {
				// check whether element added or not
				// if not, add it
				$('<h4 class="text-danger">All input data is required!</h4>')
					.insertAfter($('#add-edit-user'));
			}

			return true;
		}

		return false;
	}

	/**
	 * reset all input tag in add-edit form and reset button text
	 */
	function resetForm() {
		$('#userId').val('');
		$('#userName').val('');
		$('#userAddress').val('');
		$('#userEmail').val('');
		$('#add-edit-user').text('Add user');
		$('h4.text-danger').remove();
	}

	App.AppManager = AppManager;

})(Application);

