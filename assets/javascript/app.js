    //Initial array of movies	
    $(document).ready(function() {

        var topics = ["Dog", "Cat", "Monkey", "Bear", "Bunny"];

        //  create topics array buttons
        function renderButtons() {
            $('#buttons-view').empty();

            for (var i = 0; i < topics.length; i++) {
                //create all buttons
                var a = $('<button>');
                a.addClass('animals');
                a.attr('data-name', topics[i]);
                a.text(topics[i]);
                $('#buttons-view').append(a);
            }
        }
        renderButtons();

        //on button click
        $(document).on('click', '.animals', function() {

            //new variable will log the text data from each button
            var animalGif = $(this).html();
            // console.log(animalGif);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=ynFTVfkAwz3tDpsyIcbVdgE1bI5lyqtd&limit=10";
            // console.log(queryURL);

            // Creating an AJAX call for the specific animal button being clicked
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                var results = response.data;
                //console.log(results);
                //empties the div before adding more gifs
                $('#animals-view').empty();
                for (var j = 0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    // console.log(imageView);  

                    var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

                    // Pulling ratings for each movie
                    var rating = results[j].rating;
                    // console.log(rating);
                    var displayRated = $('<p>').text("Rating: " + rating);
                    $('#movies-view').prepend(displayRated);
                } // end for loop

            }); // done response

            //function to stop and animate gifs
            function playGif() {
                var state = $(this).attr('data-state');
                // console.log(state);
                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            } //end of on click function

        }); //end of document on click 

        //adding new button to array
        $(document).on('click', '#add-animal', function() {
            if ($('#animal-input').val().trim() == '') {
                alert('Input can not be left blank');
            } else {
                var animals = $('#animal-input').val().trim();
                topics.push(movies);
                $('#animal-input').val('');
                renderButtons();
                return false;

            }

        });


    });