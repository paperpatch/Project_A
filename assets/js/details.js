var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";

/* ---------------------- RECIPE SECTION ---------------------- */

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
  // console.log(data);

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

  // get Nutrition Value from food name by running through Ninja API
  fetchNutrition(foodName);
  
  // create elements
  let detailSection = $("<div>").addClass("card-section");
  let detailImg = $("<img>").attr("src", foodImg).addClass("detail-img");
  let detailName = $("<h5>").text(foodName);
  let detailTime = $("<p>").text("Time: " + foodTime);
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
      // need to change this alert to modal
      alert("Error: " + response.statusText)
    }
  })
  .catch(err => {
    console.error(err);
  });
}

var getNutritionDetail = function(data) {
  console.log(data);

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

/* ---------------------- UTILITIES SECTION ---------------------- */


// Load Recent Local Storage
var detailStorage = JSON.parse(window.localStorage.getItem("recentRecipe")) || [];

var foodID = "4524"; // Need to pull this data from detailStorage.
foodDetail();