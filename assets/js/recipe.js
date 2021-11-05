var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var recipeGrid = document.querySelector("#recipeGrid")

var foodRecipeFilter = function () {
  fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
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

        genRecipeCard();
        // add recipe filter function using `for loop`[i] and appending it to the list. Max a max limit?
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

var foodRelatedRecipes = function() {
  fetch("https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup", {
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

        genRecipeCard();
        // add recipe filter function using `for loop`[i] and appending it to the list. Max a max limit?
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

//  <div class="card small-3">
  {/* <div class="card-section">
    <img src="http://placehold.it/300x200">
  </div>
  <div class="card-section">
    <h5>Dish Name</h5>
    <div class="grid-x">
      <i class="small-1 fa-solid fa-clock"></i>
      <p class="small-11">1 hours</p>
      <p>? ingredients</p>
    </div>
  </div>
</div>  */}

var genRecipeCard = function(data) {
  console.log(data);

  var parentCard = document.createElement("div");
  parentCard.setAttribute("class", "card small-3")
  var cardSection1 = document.createElement("div");
  cardSection1.setAttribute("class", "card-section")
  var cardSectionImg = document.createElement("img");
  cardSectionImg.setAttribute("src", "http://placehold.it/300x200")
  
  // insert rest here
  
  cardSection1.appendChild(cardSectionImg)
  parentCard.appendChild(cardSection1)
  recipeGrid.appendChild(parentCard)
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

// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];
for (let i=0; i < recentRecipeStorage.length; i++) {
  appendRow(recentRecipeStorage[i]);
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

// Load Searched Recipe

var recipeStorage = JSON.parse(window.localStorage.getItem("searchRecipe")) || [];
// foodRecipeSearch(recipeStorage);