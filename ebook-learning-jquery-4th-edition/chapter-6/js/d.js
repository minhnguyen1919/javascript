$(document).ready(function() {
	$('#letter-d a').click(function(event) {
		event.preventDefault();
		$.get('d.xml', function(data) {
			$('#dictionary').empty();
			$(data).find('entry').each(function() {
				var $entry = $(this);
				var html = '<div class="entry">';
				html += '<h3 class="term">' + $entry.attr('term');
				html += '</h3>';
				html += '<div class="part">' + $entry.attr('part');
				html += '</div>';
				html += '<div class="definition">';
				html += $entry.find('definition').text();
				var $quote = $entry.find('quote');
				if ($quote.length) {
					html += '<div class="quote">';
					$quote.find('line').each(function() {
						html += '<div class="quote-line">';
						html += $(this).text() + '</div>';
					});
					if ($quote.attr('author')) {
						html += '<div class="quote-author">';
						html += $quote.attr('author') + '</div>';
					}
					html += '</div>';
				}
				html += '</div>';
				html += '</div>';
				$('#dictionary').append($(html));
			});
		});
	});
});
