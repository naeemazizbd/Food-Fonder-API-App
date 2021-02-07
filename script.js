//API Call and connect all div id
const foodApiUrl = "https://www.themealdb.com/api/json/v1/1/";
const searchInputArea = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const displayResultArea = document.getElementById("search-result-area");
const foodDetailsResult = document.getElementById("details-result-area");

//search box functionality and food results functionality
searchButton.addEventListener("click", () => {
    searchFoodName(searchInputArea.value);
})
const searchFoodName = keyword => {
    if (keyword != "") {
        showLoader(displayResultArea, true);
        let url = `${foodApiUrl}search.php?s=${keyword}`;
        fetch(encodeURI(url))
            .then(data => data.json())
            .then(data => {
                showLoader(displayResultArea, false);
                displayFoodResult(data);
            });
    }
}

// search result not found functionality
const displayFoodResult = data => {
    if (data.meals == null) {
        notFoundResultMassage();
    } else {
        displayResultArea.innerHTML = createResultCard(data)
    }
}
const notFoundResultMassage = () => {
    displayResultArea.innerHTML = `<h3>Not found! Please search valuable food names or food first latter</h3>`;
}

//matching search food show functionality
const createResultCard = data => {
    let meals = data.meals;
    let elementString = "";
    meals.forEach(data => {
        elementString += `<div class="food-item m-3 rounded bg-primary p-2 text-white" onclick="foodDetailsResultShow(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return elementString;
}

//food details card element functionality with 5 material
const foodDetailsResultShow = id => {
    let url = `${foodApiUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data => data.json())
        .then(data => {
            let item = data.meals[0];
            let ingredients = "";
            for (let i = 1; i <= 5; i++) {
                ingredients += `<li> ${item["strIngredient" + i]}</li>`;
            }
            foodDetailsResult.innerHTML = `<div id="moreDetails" class=" ">
              <div class="moreDetails-content bg-primary rounded mt-4 ">
                
                    <button class="btn btn-primary >"id="moreDetails-btn" onclick="foodDetailsResultHide()">X</button>
                    <div class=" d-flex">
                    <img src="${item.strMealThumb}" />
                    <div class="details p-3 text-white">
                      <h2>${item.strMeal}</h2>
                      <h4>Making materials</h4>
                      <ol>${ingredients}</ol>
                    </div>
                    </div>          
                  </div>  
            </div>`;
        });
}

// food Details Result Show and Hide functionality
const foodDetailsResultHide = () => {
    foodDetailsResult.innerHTML = "";
}
const showLoader = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}