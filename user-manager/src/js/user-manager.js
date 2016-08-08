/*global _, $ */

var Application = Application || {};

;(function(App) {
	'use strict';

	function UserManager() {
		this.id = localStorage.getItem('currentId');
		this.us = new App.UserStorage();
		this.listUsers = this.us.getAllUser();
	}

	/**
	 * view all users to #view-all-user
	 */
	UserManager.prototype.viewAllUser = function viewAllUser(thisObj) {
		var userNode;

		_.forEach(thisObj.listUsers, function(user) {
			userNode = user.viewUser();
			userNode.appendTo($('#view-all-user'));
		});
	};

	/**
	 * handler for add new user event
	 */
	UserManager.prototype.addUser = function addUser() {
		var id = this.us.getCurrentId();
		var name = $('#userName').val();
		var address = $('#userAddress').val();
		var email = $('#userEmail').val();

		var user = new App.User(id++, name, address, email);

		this.listUsers.push(user);
		var userNode = user.viewUser();
		userNode.appendTo($('#view-all-user'));

		this.us.saveUserData(this.listUsers, id);
	};

	/**
	 * handler for edit user event
	 */
	UserManager.prototype.editUser = function editUser(id) {
		var index = this.findIndexById(id);
		if (index === -1) {
			window.alert(App.USER_DOES_NOT_EXIST_MSG);
			return;
		}

		var user = this.listUsers[index];
		var name = $('#userName').val();
		var address = $('#userAddress').val();
		var email = $('#userEmail').val();
		user.editUser(name, address, email);

		var userNode = $('tr[data-id=' + user.getId() + ']');
		userNode.children('.user-name').text(user.name);
		userNode.children('.user-address').text(user.address);
		userNode.children('.user-email').text(user.email);

		this.us.saveUserData(this.listUsers);
	};

	/**
	 * delete an user
	 */
	UserManager.prototype.deleteUser = function deleteUser(userNode, nodeId) {
		if (window.confirm(App.CONFIRM_DELETE_USER_MSG)) {
			userNode.remove();
			_.remove(this.listUsers, function(user) {
				return parseInt(user.getId()) === parseInt(nodeId);
			});

			this.us.saveUserData(this.listUsers);
		}
	};

	/**
	 * view information of an user to add-edit form
	 */
	UserManager.prototype.viewEditUser = function viewEditUser(user) {
		$('#userId').val(user.getId());
		$('#userName').val(user.name).focus();
		$('#userAddress').val(user.address);
		$('#userEmail').val(user.email);
		$('#add-edit-user').text('Update');
	};

	/**
	 * find index of object in listUsers by id
	 * @param {Number} id
	 * @return {Number} index
	 */
	UserManager.prototype.findIndexById = function findIndexById(id) {
		var index = _.findIndex(this.listUsers, function(user) {
			return user.getId() === parseInt(id);
		});

		return index;
	};

	/**
	 * find all users that the name is match with searchKey
	 * @param {String} searchKey
	 * @return {USer Array}
	 */
	UserManager.prototype.findUserByName = function findUserByName(searchKey) {
		return _.filter(this.listUsers, function(user) {
			return _.includes(user.name.toLowerCase(), searchKey.toLowerCase());
		});
	};

	App.UserManager = UserManager;

})(Application);

