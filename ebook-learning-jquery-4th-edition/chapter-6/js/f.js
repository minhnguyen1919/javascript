$(document).ready(function() {
	$('#letter-f form').submit(function(event) {
		event.preventDefault();
		var formValues = $(this).serialize();
		$.get('f.php', {'term': $('input[name="term"]').val()},
			function(data) {
				$('#dictionary').html(data);
			});
	});
});
