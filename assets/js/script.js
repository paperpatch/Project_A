var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var foodForm = document.querySelector("#food-form");

// Search Section
var formSubmitHandler = function (event) {
  event.preventDefault();

  // get value from input element
  let searchInput = foodForm.value.trim();
  let searchValue = searchInput.toLowerCase();

  // clear search input and old data
  $("#input-search").val("");
  window.localStorage.removeItem("searchRecipe")

  // set to localStorage for Discover Recipes HTML Page
  window.localStorage.setItem("searchRecipe", JSON.stringify(searchValue));
  // redirect to page
  window.location.assign('./assets/html/recipes.html')
}

var trendingRecipe = function() {
  fetch("https://tasty.p.rapidapi.com/feeds/list?size=20&timezone=%2B0700&vegetarian=%3CREQUIRED%3E&from=0", {
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
        getTrendingData(data);
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

var getTrendingData = function(data) {
  // get trending dishes
  let trendingRecipe = data.results[3].items;
  console.log(trendingRecipe);

  for (let i=0; i < trendingRecipe.length-2; i++) {
    // get variables
    let foodName = trendingRecipe[i].name;
    let foodImg = trendingRecipe[i].thumbnail_url;
    let foodTime = trendingRecipe[i].cook_time_minutes;
    let foodServings = trendingRecipe[i].num_Servings;
    let foodID = trendingRecipe[i].id

    console.log(foodID);

    // create card for each [i]
    let trendingCard = $("<div>").addClass("card small-3").attr("id", foodID);
    let trendingSection = $("<div>").addClass("card-section");
    let trendingImg = $("<img>").attr("src", foodImg).addClass("trending-img");
    let trendingSection2 = $("<div>").addClass("card-section");
    let trendingName = $("<h5>").text(foodName);
    let trendingTime = $("<p>").text(foodTime + " minutes");
    let trendingServings = $("<p>").text("Serves: " + foodServings)

    console.log(trendingCard);
    // append cards
    $(".trendingRecipes").append(trendingCard);
    trendingCard.append(trendingSection, trendingSection2);
    trendingSection.append(trendingImg);
    trendingSection2.append(trendingName, trendingTime, trendingServings);
  }
}

// Appended Recent Search List for Details HTML Page
$("#recipes-container").on("click", "li", function () {
  // clear old data
  window.localStorage.removeItem("recentRecipe")
  // set localStorage for third html page
  let searchList = $(this).text();
  window.localStorage.setItem("recentRecipe", JSON.stringify(searchList));
  // redirect to page
  window.location.assign('./assets/html/detail.html')
})

// Event Listener Section
foodForm.addEventListener("submit", formSubmitHandler);

trendingRecipe();