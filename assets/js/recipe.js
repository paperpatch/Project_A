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
  // empty previous data
  $("#recipeGrid").empty();

  for (let i=0; i < data.results.length; i++) {
    // get variables
    let foodName = data.results[i].name;
    let foodImg = data.results[i].thumbnail_url;
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

/* ---------------------- UTILITIES SECTION ---------------------- */

// Search Function

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  var searchFood = searchInput2.value.trim();

  // empty old data
  $("#input-search2").empty();
  $("#recipeGridTitle").empty();

  // make title for grid.
  $("#recipeGridTitle").text("Related Recipes: " + searchFood)

  // need to replace 'spaces' with %20 for fetch request to work
  let searchFoodReplaceSpace = searchFood.split(" ").join("%20");
  foodRecipeFilter(searchFoodReplaceSpace);
}

// Appended Recent Search List for Details HTML Page
$("#recipes-container2").on("click", "li", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")

  // set localStorage for detail html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  window.location.assign('../html/detail.html')
})

// Append Recipe List Function
var appendRow = function(foodName, foodID) {
  let li = $("<li>").attr("id", foodID).text(foodName);
  $("#recipes-container2").append(li);
}

/* ---------------------- LOAD SECTION ---------------------- */


// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];

// clear old data
$("#recipes-container2").empty();

for (let i=0; i < recentRecipeStorage.length; i++) {
  let storageName = recentRecipeStorage[i];
  let storageID = recentRecipeStorage[i+1];
  i++;
  appendRow(storageName, storageID);
}

// Event Listener Section
searchForm2.addEventListener("submit", formSubmitHandler);

// Load Searched Recipe
var recipeStorage = JSON.parse(window.localStorage.getItem("searchRecipe")) || [];

// make title for grid.
$("#recipeGridTitle").empty();
$("#recipeGridTitle").text("Related Recipes: " + recipeStorage)

// need to replace 'spaces' with %20 for fetch request to work
var recipeStorageReplaceSpace = recipeStorage.split(" ").join("%20");
foodRecipeFilter(recipeStorageReplaceSpace);