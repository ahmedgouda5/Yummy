const categories = document.querySelector(".Categories");
const row = document.querySelector(".row");
const SearchInput1 = document.querySelector(".SearchInput1");

const inputEmail = document.querySelector(".inputemail");
const inputName = document.querySelector(".inputname");
const inputPhone = document.querySelector(".inputphone");
const inputNumber = document.querySelector(".inputnumber");
const inputPassword = document.querySelector(".inputpassword");
const submitBtn = document.querySelector(".submitBtn");

emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
nameRegex = /([a-zA-Z0-9_\s]+)/;
passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

console.log(
  inputEmail,
  inputName,
  inputNumber,
  inputPassword,
  inputPhone,
  submitBtn
);

$(".cancel").on("click", function () {
  $(".side").animate({ left: "134" }, 1000, function () {
    $(".sidenav").animate({ left: "0" }, function () {
      $(".cancel").fadeOut(100, function () {
        $(".x-mark").removeClass("d-none");
        $(".link").slideDown(100);
      });
    });
  });
});

$(".x-mark").on("click", function () {
  $(".sidenav").animate({ left: "-200px" }, 500, function () {
    $(".side").animate({ left: "0" }, 100, function () {
      $(".cancel").fadeIn(100, function () {
        $(".x-mark").addClass("d-none");
        $(".link").slideDown(100);
      });
    });
  });
});

// !================>start meals
async function meal() {
  $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let response = await result.json();
  displayMeals(response.meals);
}

meal();

async function displayMeals(response) {
  let cartona = ``;
  for (let i = 0; i < response.length; i++) {
    cartona += `
        <div onclick="getDetailsMeals('${response[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
        <a href=""><img src="${response[i].strMealThumb}" class="w-100 m-0"></a>
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                <h1>${response[i].strMeal}</h1>
            </div>
        </div>
        `;
  }
  document.querySelector(".row").innerHTML = cartona;
}

async function getDetailsMeals(idMeal) {
  $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await result.json();
  displayDetailsMeals(response.meals);
  $(".loading").fadeOut(800);
}

function displayDetailsMeals(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div class="col-12 col-md-4 justify-content-center align-items-center flex-column text-center text-white">
            <div class="inner">
                <img src="${meal[i].strMealThumb}" class="w-100 img-fluid rounded-3" alt="">
                <h2>${meal[i].strMeal}</h2>
            </div>
        </div>
        <div class="col-12 col-md-6 justify-content-center align-items-center flex-column text-white">
            <div class="inner">
                <span class="h1">Instructions</span>
                <p>${meal[i].strInstructions}</p>
                <span class="h3">Area: ${meal[i].strArea}</span><br>
                <span class="h3">Category: ${meal[i].strCategory}</span><br>
                <span class="h3">Tags: ${meal[i].strTags}</span><br>
                <div class="my-2">
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient2}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient1}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient3}</span><br><br>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient4}</span>
                <span class="m-2  p-2 bg-danger rounded-3">${meal[i].strIngredient5}</span>
                </div>
                <div>
                    <h3>Links:</h3>
                    <a href="${meal[i].strSource} " class="btn btn-primary">source</a>
                    <a href="${meal[i].strYoutube}" class="btn btn-danger">you tube</a>
                    </div>
            </div> 
        </div>
    `;
  }

  document.querySelector(".row").innerHTML = cartona;
}
// !================>End meals
// ~================>start categories
async function getCategories() {
  document.querySelector(".row").innerHTML = ``;
  $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await result.json();
  // console.log(response.categories);
  displayCategories(response.categories);
}
getCategories();

function displayCategories(categories) {
  let cartona = ``;
  for (let i = 0; i < categories.length; i++) {
    cartona += `
        <div onclick="getDetailsCate('${categories[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
            <a href=""><img src="${categories[i].strCategoryThumb}" class="w-100 m-0"></a>
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                <h1>${categories[i].strCategory}</h1>
            </div>
        </div>
        `;
  }
  $(".Categories").on("click", function () {
    $(".row").html(cartona);
  });
}
async function getDetailsCate(meal) {
  $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php?i=${meal}`
  );
  let response = await result.json();
  // console.log(response.meals);
  displayDetailsCate(response.meals);
}
function displayDetailsCate(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div onclick="moreDetailsCate('${meal[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
            <a href=""><img src="${meal[i].strMealThumb}" class="w-100 m-0"></a>
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                <h1>${meal[i].strMeal}</h1>
            </div>
        </div>`;
  }

  document.querySelector(".row").innerHTML = cartona;
}

// ~================>End categories
// ~================>start Area

async function getArea() {
  $("loading").fadeIn(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await result.json();
  // console.log(response.meals);

  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(800);
}
getArea();

function displayArea(Area) {
  let cartona = ``;
  for (let i = 0; i < Area.length; i++) {
    cartona += `
        <div onclick="AreaData('${Area[i].strArea}')" class="col-sm-5 col-md-3 text-center  text-white">
            <i class="fa-solid fa-house-laptop fs-1"></i>
            <h3>'${Area[i].strArea}'</h3>
        </div>
     `;
  }
  $(".Area").on("click", function () {
    $(".row").html(cartona);
  });
}
async function AreaData(place) {
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${place}`
  );
  let response = await result.json();
  // console.log(response.meals);
  displayAreaData(response.meals);
}
function displayAreaData(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div onclick="moreDetailsArea('${meal[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
            <a href=""><img src="${meal[i].strMealThumb}" class="w-100 m-0"></a>
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                <h1>${meal[i].strMeal}</h1>
            </div>
        </div>`;
  }

  document.querySelector(".row").innerHTML = cartona;
}

async function moreDetailsArea(idMeal) {
  let result = await fetch(
    `https:www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  let response = await result.json();
  // console.log(response.meals);
  displayMore(response.meals);
}

function displayMore(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div class="col-12 col-md-4 justify-content-center align-items-center flex-column text-center text-white">
            <div class="inner">
                <img src="${meal[i].strMealThumb}" class="w-100 img-fluid rounded-3" alt="">
                <h2>${meal[i].strMeal}</h2>
            </div>
        </div>
        <div class="col-12 col-md-6 justify-content-center align-items-center flex-column text-white">
            <div class="inner">
                <span class="h1">Instructions</span>
                <p>${meal[i].strInstructions}</p>
                <span class="h3">Area: ${meal[i].strArea}</span><br>
                <span class="h3">Category: ${meal[i].strCategory}</span><br>
                <span class="h3">Tags: ${meal[i].strTags}</span><br>

                <div class="my-2">
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient2}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient1}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient3}</span><br><br>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient4}</span>
                <span class="m-2  p-2 bg-danger rounded-3">${meal[i].strIngredient5}</span>
                </div>
                <div>
                    <h3>Links:</h3>
                    <a href="${meal[i].strSource} " class="btn btn-primary">source</a>
                    <a href="${meal[i].strYoutube}" class="btn btn-danger">you tube</a>
                    </div>
            </div> 
        </div>
    `;
  }

  document.querySelector(".row").innerHTML = cartona;
}

// ~================>End Area
// *========> start Ingredients

async function getIngredients() {
  $("loading").fadeIn(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let response = await result.json();
  // console.log(response.meals);

  displayIngredients(response.meals);
  $(".inner-loading-screen").fadeOut(800);
}
getIngredients();

function displayIngredients(Ingredients) {
  let cartona = ``;
  for (let i = 0; i < Ingredients.length; i++) {
    cartona += `
        <div onclick="IngredientsData('${Ingredients[i].strIngredient}')" class="col-sm-5 col-md-3 text-center  text-white">
            <i class="fa-solid fa-drumstick-bite fs-1"></i>
            <h3>'${Ingredients[i].strIngredient}'</h3>
            <p>${Ingredients[i].strDescription}</p>
        </div>
     `;
  }
  $(".Ingredients").on("click", function () {
    $(".row").html(cartona);
  });
}
async function IngredientsData(name) {
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  let response = await result.json();
  console.log(response);
  displayIngredientsData(response.meals);
}
function displayIngredientsData(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div onclick="moreDetailsIng('${meal[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
            <a href=""><img src="${meal[i].strMealThumb}" class="w-100 m-0"></a>
            <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                <h1>${meal[i].strMeal}</h1>
            </div>
        </div>`;
  }

  document.querySelector(".row").innerHTML = cartona;
}

async function moreDetailsIng(byId) {
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${byId}`
  );
  let response = await result.json();
  console.log(response);
  displayMoreIn(response.meals);
}

function displayMoreIn(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div class="col-12 col-md-4 justify-content-center align-items-center flex-column text-center text-white">
            <div class="inner">
                <img src="${meal[i].strMealThumb}" class="w-100 img-fluid rounded-3" alt="">
                <h2>${meal[i].strMeal}</h2>
            </div>
        </div>
        <div class="col-12 col-md-6 justify-content-center align-items-center flex-column text-white">
            <div class="inner">
                <span class="h1">Instructions</span>
                <p>${meal[i].strInstructions}</p>
                <span class="h3">Area: ${meal[i].strArea}</span><br>
                <span class="h3">Category: ${meal[i].strCategory}</span><br>
                <span class="h3">Tags: ${meal[i].strTags}</span><br>

                <div class="my-2">
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient2}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient1}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient3}</span><br><br>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient4}</span>
                <span class="m-2  p-2 bg-danger rounded-3">${meal[i].strIngredient5}</span>
                </div>
                <div>
                    <h3>Links:</h3>
                    <a href="${meal[i].strSource} " class="btn btn-primary">source</a>
                    <a href="${meal[i].strYoutube}" class="btn btn-danger">you tube</a>
                    </div>
            </div> 
        </div>
    `;
  }
  $(".loading").fadeOut(800);
  document.querySelector(".row").innerHTML = cartona;
}

//*========> End Ingredients

// ^========> start search
function showInputs() {
  let cartona = `<div class="d-flex justify-content-between flex-column flex-md-row w-75">
        <input onkeyup="getSearch(this.value)" type="search" class="form-control SearchInput1 mx-3 mb-2 "  placeholder="Search by Name">
        <input  onkeyup="getFilter(this.value)" type="search" class="form-control SearchInput2 mx-3 mb-2"  placeholder="Search by first letter">
    </div>`;

  $(".Search").on("click", function () {
    document.querySelector(".row").innerHTML = "";
    $(".search").html(cartona);
  });
}

showInputs();
async function getSearch(value) {
  $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  let response = await result.json();
  console.log(response);
  showSearch(response.meals);
}

function showSearch(response) {
  let cartona = "";
  for (let i = 0; i < response.length; i++) {
    cartona += `
            <div onclick="getDetailsSearch('${response[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
                <a href=""><img src="${response[i].strMealThumb}" class="w-100 m-0"></a>
                <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                    <h1>${response[i].strMeal}</h1>
                </div>
            </div>`;
  }
  document.querySelector(".row").innerHTML = cartona;
}
async function getDetailsSearch(byId) {
    $(".loading").fadeOut(800);
  let result = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${byId}`
  );
  let response = await result.json();
  console.log(response);
  displayDetailsSearch(response.meals);
}
 function displayDetailsSearch(meal) {
  let cartona = ``;
  for (let i = 0; i < meal.length; i++) {
    cartona += `
        <div class="col-12 col-md-4 justify-content-center align-items-center flex-column text-center text-white">
            <div class="inner">
                <img src="${meal[i].strMealThumb}" class="w-100 img-fluid rounded-3" alt="">
                <h2>${meal[i].strMeal}</h2>
            </div>
        </div>
        <div class="col-12 col-md-6 justify-content-center align-items-center flex-column text-white">
            <div class="inner">
                <span class="h1">Instructions</span>
                <p>${meal[i].strInstructions}</p>
                <span class="h3">Area: ${meal[i].strArea}</span><br>
                <span class="h3">Category: ${meal[i].strCategory}</span><br>
                <span class="h3">Tags: ${meal[i].strTags}</span><br>

                <div class="my-2">
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient2}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient1}</span>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient3}</span><br><br>
                <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient4}</span>
                <span class="m-2  p-2 bg-danger rounded-3">${meal[i].strIngredient5}</span>
                </div>
                <div>
                    <h3>Links:</h3>
                    <a href="${meal[i].strSource} " class="btn btn-primary">source</a>
                    <a href="${meal[i].strYoutube}" class="btn btn-danger">you tube</a>
                    </div>
            </div> 
        </div>
    `;
  }
  $(".loading").fadeOut(800);
  document.querySelector(".row").innerHTML = cartona;
  $(".search").html("");
}
// !!filter
 async function getFilter(letter){
    $(".loading").fadeOut(800);
    let result = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}` );
      let response = await result.json();
      console.log(response.meals);
      displayGetFilter(response.meals)

}
function displayGetFilter(response) {
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      cartona += `
              <div onclick="getDetailsFilter('${response[i].idMeal}')" class="inner click col-12 col-md-3 bg-white position-relative p-0 overflow-hidden">
                  <a href=""><img src="${response[i].strMealThumb}" class="w-100 m-0"></a>
                  <div class="overlay position-absolute d-flex align-items-center justify-content-center">
                      <h1>${response[i].strMeal}</h1>
                  </div>
              </div>`;
    }
    document.querySelector(".row").innerHTML = cartona;
  }
  async function getDetailsFilter(byId) {
    $(".loading").fadeOut(800);
    let result = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${byId}`
    );
    let response = await result.json();
    console.log(response);
    displayDetailsFilter(response.meals);
  }
  function displayDetailsFilter(meal) {
    let cartona = ``;
    for (let i = 0; i < meal.length; i++) {
      cartona += `
          <div class="col-12 col-md-4 justify-content-center align-items-center flex-column text-center text-white">
              <div class="inner">
                  <img src="${meal[i].strMealThumb}" class="w-100 img-fluid rounded-3" alt="">
                  <h2>${meal[i].strMeal}</h2>
              </div>
          </div>
          <div class="col-12 col-md-6 justify-content-center align-items-center flex-column text-white">
              <div class="inner">
                  <span class="h1">Instructions</span>
                  <p>${meal[i].strInstructions}</p>
                  <span class="h3">Area: ${meal[i].strArea}</span><br>
                  <span class="h3">Category: ${meal[i].strCategory}</span><br>
                  <span class="h3">Tags: ${meal[i].strTags}</span><br>
  
                  <div class="my-2">
                  <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient2}</span>
                  <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient1}</span>
                  <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient3}</span><br><br>
                  <span class="m-2 p-2 bg-danger rounded-3">${meal[i].strIngredient4}</span>
                  <span class="m-2  p-2 bg-danger rounded-3">${meal[i].strIngredient5}</span>
                  </div>
                  <div>
                      <h3>Links:</h3>
                      <a href="${meal[i].strSource} " class="btn btn-primary">source</a>
                      <a href="${meal[i].strYoutube}" class="btn btn-danger">you tube</a>
                      </div>
              </div> 
          </div>
      `;
    }
  
    document.querySelector(".row").innerHTML = cartona;
    $(".search").html("");
  }
  


// ^========> End search

// !========> start contact
function contactInput() {
    let cartona = `
        <div class="col-md-4">
            <input type="email" id="inputEmail" class="form-control inputemail" placeholder="Enter Your Email">
        </div>
        <div class="col-md-4">
            <input type="text" id="inputName" class="form-control inputname" placeholder="Enter Your Name">
        </div>
        <div class="col-md-4">
            <input type="tel" id="inputPhone" class="form-control inputphone" placeholder="Enter Your Phone">
        </div>
        <div class="col-md-4">
            <input type="number" id="inputNumber" class="form-control inputnumber" placeholder="Enter Your Number">
        </div>
        <div class="col-md-4">
            <input type="password" id="inputPassword" class="form-control inputpassword" placeholder="Enter Your Password">
        </div>
        <div class="col-md-4">
            <input type="password" id="inputRepassword" class="form-control inputrepassword" placeholder="Re-enter Your Password">
        </div>
        <button disabled id="submitBtn" class="btn btn-outline-danger submitBtn px-2 mt-3 w-25">Submit</button>
    `;

    $(".contact").on("click", function () {
        $(".row").html(cartona);
    });
}

contactInput();

$("#inputEmail").on("input", function() {
    if (emailValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
});

function emailValidation() {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test($("#inputEmail").val());
}


// !========> End contact
