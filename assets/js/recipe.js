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

  // empty previous data
  $("#recipeGridTitle").empty();
  $("#recipeGrid").empty();

  // make title for grid. Value taken from searched name from bottom of page.
  // $("#recipeGridTitle").text("Related Recipes: " + searchValue.split("%20").join(" "));}

  for (let i=0; i < data.results.length; i++) {
    // get variables
    let foodName = data.results[i].name;
    console.log()
    let foodImg = data.results[i].thumbnail_url;
    let foodID = data.results[i].id

    // make title for grid. Value taken from searched name from bottom of page.
    $("#recipeGridTitle").text("Related Recipes: " + foodName)

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
  let searchFood = searchInput2.value;
  searchFood.trim();

  // empty old data
  $("#input-search2").empty();

  let searchFoodReplaceSpace = searchFood.split(" ").join("%20");
  foodRecipeFilter(searchFoodReplaceSpace);
}

// Appended Recent Search List for Details HTML Page
$("#recipes-container2").on("click", "li", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")
  // set localStorage for third html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  // redirect to page
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
  console.log(recentRecipeStorage)
  appendRow(recentRecipeStorage[i].name, recentRecipeStorage[i].id);
}

// Event Listener Section
searchForm2.addEventListener("submit", formSubmitHandler);

// Load Searched Recipe
var recipeStorage = JSON.parse(window.localStorage.getItem("searchList")) || [];
foodRecipeFilter(recipeStorage);