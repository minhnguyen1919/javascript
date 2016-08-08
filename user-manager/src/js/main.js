/*global*/

var Application = Application || {};

$(document).ready(function() {
	'use strict';
	var USER_DOES_NOT_EXIST_MSG = 'This user is no longer exist!';
	var CONFIRM_DELETE_USER_MSG = 'Do you realy want to delete this user?';

	var appManager = new Application.AppManager();
	appManager.appStart();

	Application.USER_DOES_NOT_EXIST_MSG = USER_DOES_NOT_EXIST_MSG;
	Application.CONFIRM_DELETE_USER_MSG = CONFIRM_DELETE_USER_MSG;
});
