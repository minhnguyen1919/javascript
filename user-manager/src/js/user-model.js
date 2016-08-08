/*global*/

var Application = Application || {};

;(function(App) {
	'use strict';

	function User(userId, name, address, email) {
		this.name = name || [];
		this.address = address || [];
		this.email = email || [];
		var id = userId;
		this.getId = function() {
			return id;
		};
	}

	/**
	 * view an user to #view-all-user
	 * return {jQuery object} user node
	 */
	User.prototype.viewUser = function viewUser() {
		var userNode = $([
			'<tr data-id="',
			this.getId(),
			'">',
			'<td class="user-id">',
			this.getId(),
			'</td>',
			'<td class="user-name">',
			this.name,
			'</td>',
			'<td class="user-address">',
			this.address,
			'</td>',
			'<td class="user-email">',
			this.email,
			'</td>',
			'<td><a class="edit" href="#">edit</a></td>',
			'<td><a class="delete" href="#">X</a></td>',
			'</tr>'
		].join(''));

		return userNode;
	};

	/**
	 * update information of an user
	 */
	User.prototype.editUser = function editUser(name, address, email) {
		this.name = name;
		this.address = address;
		this.email = email;
	};

	App.User = User;

})(Application);
