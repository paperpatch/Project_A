var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var apiKey2 = "5eedb034a3msha6329e8ee03862bp1ded91jsn5333cfd314b9";
var searchForm3 = document.querySelector("#search-form3");
var searchInput3 = document.querySelector("#input-search3");


/* ---------------------- RECIPE SECTION ---------------------- */

var foodDetail = function(foodID) {
  fetch("https://tasty.p.rapidapi.com/recipes/detail?id=" + foodID, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "tasty.p.rapidapi.com",
      "x-rapidapi-key": apiKey2,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {
        getRecipeDetail(data);
      })
    } else {
      $(".modal-append").empty();
      $(".modal-append").append("Error: " + response.statusText)
      let popup = new Foundation.Reveal($("#modal3"));
      popup.open();
    }
  })
  .catch(err => {
    $(".modal-append").empty();
    $(".modal-append").append("Catch Error: Check console log")
    let popup = new Foundation.Reveal($("#modal3"));
    popup.open();
    console.error(err);
  });
}

var getRecipeDetail = function(data) {
  // clear previous data
  $("#instruction-list").empty();

  // get variables
  let foodImg = data.thumbnail_url;
  var foodName = data.name;
  if (data.cook_time_minutes === null || data.cook_time_minutes === 0) {
    var foodTime = "N/A";
  } else {
    var foodTime = String(data.cook_time_minutes);
  }
  if (data.num_servings === null || data.num_servings === 0) {
    var foodServings = "N/A";
  } else {
    var foodServings = String(data.num_servings);
  }
  let foodID = data.id

  // Get Nutrition Value from food name by running through Ninja API
  fetchNutrition(foodName);

  // Append to Recent Recipe List
  getRecipeList(foodName, foodID);
  
  // create elements
  let detailSection = $("<div>").addClass("card-section");
  let detailImg = $("<img>").attr("src", foodImg).addClass("detail-img");
  let detailName = $("<h5>").text(foodName);
  let detailTime = $("<p>").text("Time: " + foodTime + " minutes");
  let detailServings = $("<p>").text("Servings: " + foodServings);
  let detailInstructionHeader = $("<h5>").text("Instructions");
  let detailUnorderedList = $("<ul>");
  // create instruction for each [i]
  for (let i=0; i < data.instructions.length; i++) {
    let detailList = $("<li>").text(data.instructions[i].display_text)
    detailUnorderedList.append(detailList);
  }

  // append elements
  $("#instruction-list").append(detailSection, detailName, detailTime, detailServings, detailInstructionHeader);
  detailSection.append(detailImg);
  detailInstructionHeader.append(detailUnorderedList);
}

/* ---------------------- NUTRITION SECTION ---------------------- */


var fetchNutrition = function(foodName) {
  fetch("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=" + foodName, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {
        getNutritionDetail(data);
      })
    } else {
      $(".modal-append").empty();
      $(".modal-append").append("Error: " + response.statusText)
      let popup = new Foundation.Reveal($("#modal3"));
      popup.open();
    }
  })
  .catch(err => {
    $(".modal-append").empty();
    $(".modal-append").append("Catch Error: Check console log")
    let popup = new Foundation.Reveal($("#modal3"));
    popup.open();
    console.error(err);
  });
}

var getNutritionDetail = function(data) {
  // clear previous data
  $("#nutrition-list").empty();

  for (let i = 0; i<data.length ; i++) {
    // create elements
    let name = $("<h5>").text(data[i].name);
    let servingSize = $("<h6>").text("Serving Size: " + data[i].serving_size_g + " grams per serving");
    let calories = $("<h6>").text("Calories: " + data[i].calories);
    let fatTotal = $("<h6>").text("Total Fat: " + data[i].fat_total_g + "g");
    let fatSaturated = $("<h6>").text("Saturated Fat: " + data[i].fat_saturated_g + "g");
    let cholesterol = $("<h6>").text("Cholesterol: " + data[i].cholesterol_mg + "mg");
    let sodium = $("<h6>").text("Sodium: " + data[i].sodium_mg + "mg");
    let carbohydrates = $("<h6>").text("Carbohydrates: " + data[i].carbohydrates_total_g + "g");
    let fiber = $("<h6>").text("Fiber: " + data[i].fiber_g + "g");
    let sugar = $("<h6>").text("Sugar: " + data[i].sugar_g + "g");
    let protein = $("<h6>").text("Protein: " + data[i].protein_g + "g");
 
    var nutriSection = $("<div>").addClass("grix-y");
    var horizontalLine = $("<hr>")

    // append elements
    nutriSection.append(horizontalLine, name, servingSize, calories, fatTotal, fatSaturated, cholesterol, sodium, carbohydrates, fiber, sugar, protein)
    $("#nutrition-list").append(nutriSection);
  }
};

/* ---------------------- APPEND RECIPES LIST SECTION ---------------------- */

// Append Recipes List Function
function getRecipeList(foodName, foodID) {

  if (recentRecipeStorage.length === undefined) {
    // put modal error alert here! Something like... "Check your localStorage! Delete and refresh!"
    return;
  }

  // check if array exist. First array case only
  if (recentRecipeStorage.length === 0) {
    recentRecipeStorage[recentRecipeStorage.length]={name: foodName, id: foodID}
    window.localStorage.setItem("recipeList", JSON.stringify(recentRecipeStorage));

    appendRow(foodName, foodID);
    return;
  }

  for (let i=0; i<recentRecipeStorage.length; i++) {
    // check if name already exist
    if (recentRecipeStorage[i].name === foodName ) {
      // console.log("Existing check. No appending should happen")
      return;
    }
  }
  // console.log("Third check. Appends every time this appears.")
  recentRecipeStorage[recentRecipeStorage.length]={name: foodName, id: foodID}
  window.localStorage.setItem("recipeList", JSON.stringify(recentRecipeStorage));

  appendRow(foodName, foodID);
};

// Append Recipe List Function

function appendRow(foodName, foodID) {
  let li = $("<li>").attr("id", foodID).text(foodName);
  $("#recipes-container3").append(li);
}

/* ---------------------- UTILITIES SECTION ---------------------- */

// Search Function

function formSubmitHandler(event) {
  event.preventDefault();

  // get value from input element
  var searchFood = searchInput3.value.trim();

  // clear search input and old data
  $("#input-search3").val("");
  window.localStorage.removeItem("searchRecipe")

  // set to localStorage for Discover Recipes HTML Page
  window.localStorage.setItem("searchRecipe", JSON.stringify(searchFood));
  window.location.assign('./recipes.html')
}

// Recent Search List Function
$("#recipes-container3").on("click", "li", function () {
  let searchValue = $(this).attr("id");
  foodDetail(searchValue);
})

/* ---------------------- LOAD SECTION ---------------------- */

// Load Recent Recipe List Local Storage
var recentRecipeStorage = JSON.parse(window.localStorage.getItem("recipeList")) || [];

// clear old data
$("#recipes-container3").empty();

for (let i=0; i < recentRecipeStorage.length; i++) {
  appendRow(recentRecipeStorage[i].name, recentRecipeStorage[i].id);
}

// Event Listener Section
searchForm3.addEventListener("submit", formSubmitHandler);

// Load Searched Recipe
var foodID = JSON.parse(window.localStorage.getItem("recentRecipe")) || [];
foodDetail(foodID);