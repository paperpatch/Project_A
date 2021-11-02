var apiKey = "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6";
var foodForm = $("#food-form");

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


// Event Listener Section
// Top Search Button
foodForm.addEventListener("submit", formSubmitHandler);

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

