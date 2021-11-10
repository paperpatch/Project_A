var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var apiKey2 = "5eedb034a3msha6329e8ee03862bp1ded91jsn5333cfd314b9"
var sizeList = 20; // input how many results you want
var searchForm2 = document.querySelector("#search-form2");
var searchInput2 = document.querySelector("#input-search2");

var foodRecipeFilter = function (searchValue) {
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=" + sizeList + "&q=" + searchValue, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey2,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {

        getRecipeCard(data);
      })
    } else {
      $(".modal-append").empty();
      $(".modal-append").append("Error: " + response.statusText)
      let popup = new Foundation.Reveal($("#modal2"));
      popup.open();
    }
  })
  .catch(err => {
    $(".modal-append").empty();
    $(".modal-append").append("Catch Error: Check console log")
    let popup = new Foundation.Reveal($("#modal2"));
    popup.open();
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
    let discoverCard = $("<div>").addClass("card large-2 medium-4 small-12").attr("id", foodID);
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


// Filter Category Function

$(".categories").on("click", "a", function () {

  // set localStorage for detail html page
  let searchButton = $(this).text();
  // make title for grid.
  $("#recipeGridTitle").empty();
  $("#recipeGridTitle").text("Related Recipes: " + searchButton)

  foodRecipeFilter(searchButton);
})

// Appended Recent Search List for Details HTML Page
$("#recipes-container2").on("click", "img", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")

  // set localStorage for detail html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  window.location.assign('../html/detail.html')
})

// Clickable Cards List for Details HTML Page
$("#recipeGrid").on("click", "div", function () {
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
  $("#recipes-container2").prepend(li);
}

/* ---------------------- LOAD SECTION ---------------------- */


// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];
// Limits list to 10 total items in the array. 
if (recentRecipeStorage.length >= 10) {
recentRecipeStorage.splice(0, recentRecipeStorage.length-10)
  
}
// clear old data
$("#recipes-container2").empty();

for (let i=0; i < recentRecipeStorage.length; i++) {
  appendRow(recentRecipeStorage[i].name, recentRecipeStorage[i].id);
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

/* ---------------------- Scroll to top button ---------------------- */

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}