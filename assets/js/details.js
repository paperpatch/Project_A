var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";

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
  console.log(data);

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


var fetchNutrition = function(foodName) {
  fetch("https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=" + food, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
      "x-rapidapi-key": "5eedb034a3msha6329e8ee03862bp1ded91jsn5333cfd314b9"
    }
  })
  .then(response => {
    if (response.ok) {
      response.json().then(function (data) {
        getNutritionDetail(data, foodName);
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

fetchNutrition();



// // Load Recent Detail
var detailStorage = JSON.parse(window.localStorage.getItem("recentRecipe")) || [];

var foodID = "4524"; // Need to pull this data from detailStorage.
foodDetail();