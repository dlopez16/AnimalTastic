$(document).ready(function() {
var cartoons = ['Archer', 'Minions', 'Futurama', 'The Simpsons', 'teen titans', 'Batman',
'The Lion King', 'Peterpan', 'Gi Joe'];

	function buttonInfo() {
		var giphy = $(this).attr('data-name');
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

			$.ajax({
				url: queryUrl,
				method: 'GET'
			})
			.done(function(response) {
				console.log(queryUrl);
				console.log(response);
				
				var results = response.data;

				$('#gifShow').empty();

				for (var i = 0; i < results.length; i++) {
					var still = results[i].images.fixed_height_still.url;
					var animate = results[i].images.fixed_height.url;

					var giphyDiv = $('<div class = "giphyDiv">');

					var giphyRating = $('<p> Rating:' + results[i].rating + '</p>')
					giphyDiv.append(giphyRating);
					$('#addRating').append(giphyDiv);

					var giphyImage = $('<img>', {
						class: 'image',
						src: still
					});
					giphyImage.attr('data-still', still);
					giphyImage.attr('data-animate', animate);
					giphyImage.attr('data-state', 'still');
					giphyDiv.append(giphyImage);
					$('#gifShow').prepend(giphyDiv);
			$('.image').on('click', function() {
				var state = $(this).attr('data-state');
				console.log(state);
            if (state === 'still') {
            	$(this).attr('src', $(this).data('animate'));
            	$(this).attr('data-state', 'animate');
            	console.log('clicked1');
            } else { 
                $(this).attr('src', $(this).data('still'));
            	$(this).attr('data-state', 'still');		
            	console.log('clicked2');	
				}
			});
		}

	}); 
}
	function addButtons() {
		$('#gifBut').empty()

		for (var i = 0; i < cartoons.length; i++) {
			var newButtons = $('<button>');
			newButtons.addClass('giphy');
			newButtons.attr('data-name', cartoons[i]);
			newButtons.text(cartoons[i]);
			$('#gifBut').append(newButtons);
			console.log('buttons add');
		}
	}
	$('#gifAdd').on('click', function() {
			var input = $("#gifInput").val().trim();
			cartoons.push(input);
			addButtons();
			$("#gifInput").val("");
			return false; 
		});

	$(document).on('click', '.giphy', buttonInfo);
	addButtons();
});