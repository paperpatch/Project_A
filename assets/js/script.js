var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var foodForm = $("#food-form");

// Search Section

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  let searchInput = foodForm.value.trim();
  let searchValue = searchInput.toLowerCase();

  // clear search input
  $("")

  if ()
}

var foodRecipeSearch = function (searchValue) {

  // auto-completes the search and gives a list
  fetch("https://tasty.p.rapidapi.com/recipes/auto-complete?prefix="+searchValue, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      }
    })
    .then(response => {
      //console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          // add recipe list function using `for loop`[i] and appending it to the list. Make a max limit?
        });
      } else {
        // need to change this alert to something else
        alert("Error: " + response.statusText)
      }
    })
    .catch(err => {
      console.error(err);
    }); 
};

// Event Listener Section
// Top Search Button
foodForm.addEventListener("submit", formSubmitHandler);

// Appended Recent Search List
$("#recipes-container").on("click", "li", function () {
  foodRecipeSearch($(this).text());
})

