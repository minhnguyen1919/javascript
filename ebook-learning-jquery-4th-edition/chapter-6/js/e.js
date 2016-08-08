$(document).ready(function() {
	$('#letter-e a').click(function(event) {
		event.preventDefault();
		var requestData = {term: $(this).text()};
		$('#dictionary').load('e.php', requestData);
	});
});
