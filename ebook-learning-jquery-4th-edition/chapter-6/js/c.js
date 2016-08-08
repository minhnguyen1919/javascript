$(document).ready(function() {
	$('#letter-c a').click(function(event) {
		event.preventDefault();
		$.getScript('c.js');
	});
});
