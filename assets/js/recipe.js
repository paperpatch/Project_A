var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var sizeList = 20; // input how many results you want
var searchForm2 = document.querySelector("#search-form2");
var searchInput2 = document.querySelector("#input-search2");

var foodRecipeFilter = function (searchValue) {
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=" + sizeList + "&q=" + searchValue, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {

        getRecipeCard(data);
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

var getRecipeCard = function(data) {
  console.log(data);

  // make title for grid. Value taken from searched name from bottom of page.
  $("#recipeGridTitle").text("Related Recipes: " + storageTrim);

  for (let i=0; i < data.results.length; i++) {
    // get variables
    let foodName = data.results[i].name;
    let foodImg = data.results[i].thumbnail_url;
    for (let j=0; j< data.results[j].credits.length; j++) {
      var foodCredit = data.results[i].credits[j].name;
    }
    let foodID = data.results[i].id

    // create card for each [i]
    let discoverCard = $("<div>").addClass("card small-3").attr("id", foodID);
    let discoverSection = $("<div>").addClass("card-section");
    let discoverImg = $("<img>").attr("src", foodImg).addClass("trending-img");
    let discoverSection2 = $("<div>").addClass("card-section");
    let discoverName = $("<h5>").text(foodName);

    // append cards
    $("#recipeGrid").append(discoverCard);
    discoverCard.append(discoverSection, discoverSection2);
    discoverSection.append(discoverImg);
    discoverSection2.append(discoverName);
  }
}

/* ---------------------- APPEND RECIPES LIST SECTION ---------------------- */

// Append Recipes List Function

var getRecipeList = function (foodName, foodID) {
  // Add recipes to list, don't let it repeat. If recentRecipe can be found. 1 for yes. -1 for no.
  if (recentRecipeStorage.indexOf(foodName) === -1) {
    recentRecipeStorage.unshift(foodName, foodID);
    window.localStorage.setItem("recipeRecipe", JSON.stringify(recentRecipeStorage));

    appendRow(foodName, foodID);
  }
};

// Append Recipe List Function

var appendRow = function(foodName, foodID) {
  let li = $("<li>").attr("id", foodID).text(foodName);
  $("#recipes-container2").append(li);
}

/* ---------------------- UTILITIES SECTION ---------------------- */

// Search Function

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  let searchFood = searchInput2.value;

  // clear search input and old data
  $("#input-search2").val("");

  let searchFoodReplaceSpace = searchFood.split(" ").join("%20");
  foodRecipeFilter(searchFoodReplaceSpace)
}

$("#recipes-container2").on("click", "li", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")
  // set localStorage for third html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  // redirect to page
  window.location.assign('../html/detail.html')
})

// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];
for (let i=0; i < recentRecipeStorage.length; i++) {
  appendRow(recentRecipeStorage[i]);
}

// Load Searched Recipe
var recipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];
console.log(recipeStorage);
if (recipeStorage != "") {
  var storageTrim = JSON.stringify(recipeStorage).trim();
  console.log(storageTrim);
  let searchFromStorage = storageTrim.split(" ").join("%20");
  console.log(searchFromStorage);
  foodRecipeFilter(searchFromStorage);
} else {
  foodRecipeFilter("chicken")
}

// Event Listener Section
searchForm2.addEventListener("submit", formSubmitHandler);

// foodRecipeSearch(recipeStorage);
foodRecipeFilter(searchFromStorage);