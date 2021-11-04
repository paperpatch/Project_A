var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";

var foodDetail = function() {
  fetch("https://tasty.p.rapidapi.com/recipes/detail?id=" + foodID, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {
        getRecipeDetail(data);
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

var getRecipeDetail = function(data) {
  console.log(data);
// get variables

  let foodName = data.name;
  let foodImg = data.thumbnail_url;
  let foodRating = data[i].user_ratings.count_positive;
  let foodScore = data[i].user_ratings.score;

  // console.log(foodID);

  // create card for each [i]
  let trendingCard = $("<div>").addClass("card small-3").attr("id", foodID);
  let trendingSection = $("<div>").addClass("card-section");
  let trendingImg = $("<img>").attr("src", foodImg).addClass("trending-img");
  let trendingSection2 = $("<div>").addClass("card-section");
  let trendingName = $("<h5>").text(foodName);
  let trendingRating = $("<p>").text("Liked: " + foodRating);
  let trendingScore = $("<p>").text((foodScore * 100).toFixed(2) + "%");

  console.log(trendingCard);
  // append cards
  $(".trendingRecipes").append(trendingCard);
  trendingCard.append(trendingSection, trendingSection2);
  trendingSection.append(trendingImg);
  trendingSection2.append(trendingName, trendingRating, trendingScore);

  for (let i=0; i < data.length; i++) {
  }
  // add recipe detail function using `for loop`[i] and appending it to the list. Max a max limit?
}

var detailStorage = JSON.parse(window.localStorage.getItem("searchRecipe")) || [];
// foodDetail(detailStorage);

// // Load Recent Detail
// var detailStorage = JSON.parse(window.localStorage.getItem("recentRecipe")) || [];

var foodID = "4524"; // Need to pull this data from recipe food.
foodDetail();


var food = "Ultimate Green Bean Casserole"
var nutritionData = function() {
  fetch("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=" + food, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
      "x-rapidapi-key": "5eedb034a3msha6329e8ee03862bp1ded91jsn5333cfd314b9"
    }
  })
  .then(response => {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
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
recipe();
