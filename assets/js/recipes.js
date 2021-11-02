var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";

// TASTY API Autocompletes - Do we need?
/* 
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
 */
// TASTY API Recipe List - Do we need?
/* 
var foodRecipeFilter = function () {
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    }
  })
  .then(response => {
    console.log(response);
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        // add recipe filter function using `for loop`[i] and appending it to the list. Max a max limit?
      })
    } else {
      // need to change this alert to modal
      alert("Error: " + response.statusText)
    }
  })
  .catch(err => {
    console.error(err);
  });
}
 */
// Load Search Recipe from recentRecipe (first HTML page)

var recipeStorage = JSON.parse(window.localStorage.getItem("searchRecipe")) || [];
foodRecipeSearch(recipeStorage);