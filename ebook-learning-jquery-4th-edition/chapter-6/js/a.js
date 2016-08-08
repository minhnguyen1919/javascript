/*// don't use callback fucntion
$(document).ready(function() {
	$('#letter-a a').click(function(event) {
		event.preventDefault();
		$('#dictionary').load('a.html');
	});
});*/

/*// using callback function for load() event
$(document).ready(function() {
	$('#letter-a a').click(function(event) {
		event.preventDefault();
		$('#dictionary').hide().load('a.html', function() {
			$(this).fadeIn();
		});
	});
});*/

// use low-level ajax method
$(document).ready(function() {
	$('#letter-a a').click(function(event) {
		event.preventDefault();
		$.ajax({
			url: 'a.html',
			success: function(data) {
				$('#dictionary').html(data);
			}
		});
	});
});

// test error handling
/*$(document).ready(function() {
	$('#letter-e a').click(function(event) {
		event.preventDefault();
		var requestData = {term: $(this).text()};
		$.get('z.php', requestData, function(data) {
			$('#dictionary').html(data);
		}).fail(function(jqXHR) {
			$('#dictionary')
			.html('An error occurred: ' + jqXHR.status)
			.append(jqXHR.responseText);
		});
	});
});*/


/*$(document).ready(function() {
	$('h3.term').click(function() {
		$(this).siblings('.definition').slideToggle();
	});
});*/

$(document).ready(function() {
	$('body').on('click', 'h3.term', function() {
		$(this).siblings('.definition').slideToggle();
	});
});
