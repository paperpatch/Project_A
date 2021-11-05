var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";

var foodRecipeFilter = function () {
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=" + searchFromStorage, {
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
    let discoverCredit = $("<p>").text("Made By: " + foodCredit);

    // append cards
    $("#recipeGrid").append(discoverCard);
    discoverCard.append(discoverSection, discoverSection2);
    discoverSection.append(discoverImg);
    discoverSection2.append(discoverName, discoverCredit);
  }
}

/* ---------------------- UTILITIES SECTION ---------------------- */

// Search Function

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  let searchFood = searchInput.value;
  console.log(searchFood);

  // clear search input and old data
  $("#input-search2").val("");
  window.localStorage.removeItem("searchRecipe")

  // set to localStorage for Discover Recipes HTML Page
  window.localStorage.setItem("searchRecipe", JSON.stringify(searchFood));
  // redirect to page
  window.location.assign('../html/recipes.html')
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
var recipeStorage = JSON.parse(window.localStorage.getItem("searchRecipe")) || [];
var storageTrim = recipeStorage.trim();
let searchFromStorage = storageTrim.replace(/\s+/g,"%20");
// foodRecipeSearch(recipeStorage);

foodRecipeFilter(searchFromStorage);