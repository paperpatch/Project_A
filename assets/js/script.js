var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var apiKey2 = "5eedb034a3msha6329e8ee03862bp1ded91jsn5333cfd314b9"
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#input-search");

// Trending Recipes Section

var trendingRecipe = function() {
  fetch("https://tasty.p.rapidapi.com/feeds/list?size=20&timezone=%2B0700&vegetarian=%3CREQUIRED%3E&from=0", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey2,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {
        getTrendingData(data);
      })
    } else {
      $(".modal-append").empty();
      $(".modal-append").append("Error: " + response.statusText)
      let popup = new Foundation.Reveal($("#modal"));
      popup.open();
    }
  })
  .catch(err => {
    $(".modal-append").empty();
    $(".modal-append").append("Catch Error: Check console log")
    let popup = new Foundation.Reveal($("#modal"));
    popup.open();
    console.error(err);
  });
}

var getTrendingData = function(data) {
  // get trending dishes
  let trendingRecipe = data.results[2].items;

  for (let i=0; i < trendingRecipe.length-2; i++) {
    // get variables
    let foodName = trendingRecipe[i].name;
    let foodImg = trendingRecipe[i].thumbnail_url;
    let foodRating = trendingRecipe[i].user_ratings.count_positive;
    let foodScore = trendingRecipe[i].user_ratings.score;
    let foodID = trendingRecipe[i].id

    // create card for each [i]
    let trendingCard = $("<div>").addClass("card small-12 medium-4 large-3 shrink").attr("id", foodID);
    let trendingSection = $("<div>").addClass("card-section");
    let trendingImg = $("<img>").attr("src", foodImg).addClass("trending-img");
    let trendingSection2 = $("<div>").addClass("card-section");
    let trendingName = $("<h5>").text(foodName);
    let trendingRating = $("<p>").text("Liked: " + foodRating);
    let trendingScore = $("<p>").text((foodScore * 100).toFixed(2) + "%");

    // append cards
    $(".trendingRecipes").append(trendingCard);
    trendingCard.append(trendingSection, trendingSection2);
    trendingSection.append(trendingImg);
    trendingSection2.append(trendingName, trendingRating, trendingScore);
  }
}

/* ---------------------- UTILITIES SECTION ---------------------- */

// Search Section

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  var searchFood = searchInput.value.trim();

  // clear search input and old data
  $("#input-search").val("");
  window.localStorage.removeItem("searchRecipe")

  // set to localStorage for Discover Recipes HTML Page
  window.localStorage.setItem("searchRecipe", JSON.stringify(searchFood));
  window.location.assign('./assets/html/recipes.html')
}

// Filter Category Section

$(".categories").on("click", "a", function () {
  // clear old data
  window.localStorage.removeItem("searchRecipe")

  // set localStorage for detail html page
  let searchButton = $(this).text();
  window.localStorage.setItem("searchRecipe", JSON.stringify(searchButton));
  window.location.assign('./assets/html/recipes.html')
})

// Appended Recent Search List for Details HTML Page
$("#recipes-container").on("click", "li", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")

  // set localStorage for detail html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  window.location.assign('./assets/html/detail.html')
})

// Clickable Cards List for Details HTML Page
$(".trendingRecipes").on("click", "div", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")

  // set localStorage for detail html page
  let searchList = $(this).attr("id");
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  window.location.assign('./assets/html/detail.html')
})

// Append Recipe List Function
var appendRow = function(foodName, foodID) {
  let li = $("<li>").attr("id", foodID).text(foodName);
  $("#recipes-container").prepend(li);
}

/* ---------------------- LOAD SECTION ---------------------- */

// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];
// Limits list to 4 total items in the array. 
if (recentRecipeStorage.length >= 4) {
recentRecipeStorage.splice(0, recentRecipeStorage.length-4)

}
// clear old data
$("#recipes-container").empty();

for (let i=0; i < recentRecipeStorage.length; i++) {
  appendRow(recentRecipeStorage[i].name, recentRecipeStorage[i].id);
}

console.log(recentRecipeStorage)

// Event Listener Section
searchForm.addEventListener("submit", formSubmitHandler);

trendingRecipe();

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