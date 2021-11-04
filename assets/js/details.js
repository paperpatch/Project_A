var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var foodID = "4524"; // Need to pull this data from something.

var foodDetail = function() {
  fetch("https://tasty.p.rapidapi.com/recipes/detail?id=" + foodID, {
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
        // getRecipeDetail(data, input);
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

var getRecipeDetail = function(data, input) {

  console.log(data, input);

  // add recipe detail function using `for loop`[i] and appending it to the list. Max a max limit?
}



// Load Recent Detail
// var detailStorage = JSON.parse(window.localStorage.getItem("recentRecipe")) || [];
// foodDetail(detailStorage);
foodDetail();