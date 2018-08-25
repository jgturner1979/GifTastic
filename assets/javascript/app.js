$(document).ready(function () {

  // Initial array of topics
  var searchTopics = ["Archer", "Simpsons", "Family Guy", "Futurama"];

  // displayGifs function re-renders the HTML to display the appropriate content
  function displayGifs() {

    var search = $(this).attr("topics-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IAKNKKg1bs3pNCVnos2Yj7fIZLXkZ9jS&q=" + search + "&limit=10&offset=0&rating=PG-13&lang=en";

    // Creating an AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      // Creating a div to hold the movie

      // Needs parent element

      // Storing the rating data
      for (j = 0; j < response.data.length; j++) {
        var resultsDiv = $("<div class='results'>");
        // var imageDiv = $("<div class='image'>");
        // Retrieving the URL for the image
        var imgURL = response.data[j].images.fixed_height.url;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        resultsDiv.append(image);

        // Putting the entire gif above the previous gifs
        $("#images").prepend(resultsDiv);

        var rating = response.data[j].rating;

        // Creating an element to have the rating displayed
        var pOne = $("<h6>").text("Rating: " + rating);

        // Displaying the rating
        resultsDiv.append(pOne);

      }

    });

  }

  // Function for displaying topic buttons
  function renderButtons() {

    // Deleting the topics prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons").empty();

    // Looping through the array of search topics
    for (var i = 0; i < searchTopics.length; i++) {

      // Then dynamicaly generating buttons for each search topic in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of topics-btn to our button
      a.addClass("topics-btn");
      // Adding a data-attribute
      a.attr("topics-name", searchTopics[i]);
      // Providing the initial button text
      a.text(searchTopics[i]);
      // Adding the button to the buttons div
      $("#buttons").append(a);
    }
  }

  // This function handles events where a search topic is added and a button is clicked
  $("#search").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
  
    var topic = $("#search-input").val().trim();

    // Adding search topic from the textbox to our array
    searchTopics.push(topic);

    // Calling renderButtons which handles the processing of our searchTopics array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "topics-btn"
  $(document).on("click", ".topics-btn", displayGifs);

  // Calling the renderButtons function to display the intial buttons from the searchTopics array
  renderButtons();


});