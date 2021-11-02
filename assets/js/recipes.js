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
  
foodRecipeSearch($(this).text());