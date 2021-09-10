const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";


const APP_ID = "ea6b460c";
const APP_key = "e6822c6e487c788c767eec6943ec12c4";
// console.log(container)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  
  // I am adding this baseURL link from edamam recipe site 
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
console.log(response)
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
    
    // by typing "result.recipe.anything" i wil get any detail about that dish it was really fun for me to do this in javascript
    <img src="${result.recipe.image}" alt="">
    <div class="flex-container">
   // for label of dish
      <h1 class="title">${result.recipe.label}</h1>
      
      // for url of recipe
      <a class="view-btn" href="${result.recipe.url}">View Recipe</a>
      
      //for calories of recipe
    <p class="title">Calories: ${result.recipe.calories.toFixed(2)}</p>
    
    //for diet label of recipe
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
      </div>
  });
  searchResultDiv.innerHTML = generatedHTML;
}

