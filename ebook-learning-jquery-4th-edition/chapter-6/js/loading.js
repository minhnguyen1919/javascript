$(document).ready(function() {
	var $loading = $('<div id="loading">Loading...</div>')
		.insertBefore('#dictionary');
	$(document).ajaxStart(function() {
		$loading.show();
	}).ajaxStop(function() {
		$loading.hide();
	});
});
