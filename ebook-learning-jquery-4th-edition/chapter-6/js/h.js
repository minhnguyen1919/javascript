$(document).ready(function() {
	$('#letter-h a').click(function(event) {
		event.preventDefault();
		$('#dictionary').load('h.html .entry');
	});
});
