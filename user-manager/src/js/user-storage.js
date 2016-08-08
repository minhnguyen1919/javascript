/*global _,faker */

var Application = Application || {};

;(function(App) {
	'use strict';

	function UserStorage() {
		this.users = JSON.parse(localStorage.getItem('users'));
	}

	/**
	 * generate random {amount} users and save them to localStorage
	 * param {Number} amount
	 */
	UserStorage.prototype.generateUserData = function generateUserData(amount) {
		if (!localStorage.getItem('users')) {
			var users = _.range(amount).map(function(value) {
				return {
					id: ++value,
					name: faker.name.findName(),
					address: faker.address.streetAddress(),
					email: faker.internet.email()
				};
			});

			this.saveUserData(users, ++amount);
		}
	};

	/**
	 * get all user from localStorage
	 * @return {Array} listUsers
	 */
	UserStorage.prototype.getAllUser = function getAllUser() {
		return _.map(this.users, function(user) {
			return new App.User(user.id, user.name, user.address, user.email);
		});
	};

	/**
	 * get current id from localStorage
	 * @return {Number} currentId
	 */
	UserStorage.prototype.getCurrentId = function getCurrentId() {
		var currentId = localStorage.getItem('currentId');
		if (currentId) {
			return currentId;
		}
	};

	/**
	 * save list users and current id to localStorage
	 * @param {Array object} listUsers
	 * @param {Number} currentId
	 */
	UserStorage.prototype.saveUserData = function saveUserData(listUsers, currentId) {
		var users = _.map(listUsers, function(user) {
			return {
				id: user.id === undefined ? user.getId() : user.id,
				name: user.name,
				address: user.address,
				email: user.email
			};
		});

		localStorage.setItem('users', JSON.stringify(users));
		if (arguments[1]) {
			localStorage.setItem('currentId', currentId);
		}
	};

	App.UserStorage = UserStorage;

})(Application);
