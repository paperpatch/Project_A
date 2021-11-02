// fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "tasty.p.rapidapi.com",
//         "x-rapidapi-key": "3a44b6d72cmsh2c9491cf44c4730p152adajsn7b494b9925d6"
//     }
// })
// .then(function(response) {
//     return response.json();
// })
// .then(function(data){
//     console.log(data);
// })

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

        var recipeGrid = document.querySelector(".recipeGrid")
        function genRecipeCard() {
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
        genRecipeCard();
        genRecipeCard();
        genRecipeCard();
        genRecipeCard();
        