
/// <reference types="../@types/jquery" />
let meals=document.getElementById("categories");
let username=document.getElementById("username");
let useremail=document.getElementById("useremail");
let userphone=document.getElementById("userphone");
let userage=document.getElementById("userage");
let userpassword=document.getElementById("userpassword");
let userrepassword=document.getElementById("userrepassword");
let searchInputs=document.getElementById("search");
let submitBtn = document.getElementById("submitBtn");
const loader = document.querySelector(".loading");

function close(){
  let boxWidth = $("#linksSide").outerWidth(true)
  $(".sideNav").animate({
      left: -boxWidth
  }, 500)
  $(".openSide").removeClass("fa-x");
  $(".openSide").addClass("fa-align-justify");
  $(".links ul li").eq(0).animate({
    top:300
  },500)
  $(".links ul li").eq(1).animate({
    top:300
  },500)
  $(".links ul li").eq(2).animate({
    top:300
  },500)
  $(".links ul li").eq(3).animate({
    top:300
  },500)
  $(".links ul li").eq(4).animate({
    top:300
  },500)
   
  
}
function open(){
  $(".sideNav").animate({
    left: "0px"
}, 500)
$(".openSide").removeClass("fa-align-justify");
$(".openSide").addClass("fa-x");

for (let i = 0; i < 5; i++) {
  $(".links li").eq(i).animate({
      top: 0+(i*40)
  }, (i + 5) * 100)
}
}
close()
$("#sideBar i").on("click",function(){
  if ($(".sideNav").css("left") == "0px") {
   close();
  } else {
     
  open()
  }
})
$(".links ul li").on("click",function(){
 close()
})
//======================================
// getCategories()
async function getCategories(){
  $(".inner-loading").fadeIn(500)
  $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
 let data= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
 let result=await data.json();
//  console.log(result.categories)
 displayCategories(result.categories)
 $(".inner-loading").fadeOut(500)
}

function displayCategories(categories){
 
let cartona="";
for(let i=0;i<categories.length;i++){
cartona +=`
<div class="col-md-3">
<div class="category mt-5 h-100">
 
  <div onclick="getMealByCategory('${categories[i].strCategory}')" class="meal-img position-relative rounded">
    <div class="layer position-absolute rounded text-center pt-2">
      <h3>${categories[i].strCategory}</h3>
      <p>${categories[i].strCategoryDescription.slice(0,120)}</p>
    </div>
  <img src="${categories[i].strCategoryThumb}" class="w-100" alt="meal">
</div> 
</div>
</div>
`
  }
meals.innerHTML=cartona
}
//================================
async function getArea(){
  $(".inner-loading").fadeIn(500)
  $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
  let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
  let result=await data.json();
  // console.log(result.meals)
  displayArea(result.meals)
  $(".inner-loading").fadeOut(500)
 }

 function displayArea(area){
  let cartoona = "";

    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealByArea('${area[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white mt-5 category">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    meals.innerHTML = cartoona
  }
  //=======================================
  async function getIngredients(){
    $(".inner-loading").fadeIn(500)
    $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
    let data= await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let result=await data.json();
    // console.log(result.meals)
    displayIngredients(result.meals.slice(0, 24))
    $(".inner-loading").fadeOut(500)
   }

   function displayIngredients(intgred){
    let cartoona = "";
  
      for (let i = 0; i < intgred.length; i++) {
          cartoona += `
          <div class="col-md-3">
                  <div onclick="getMealByIngredients('${intgred[i].strIngredient}')" class="rounded-2 text-center cursor-pointer text-white mt-5 category">
                          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                          <h3>${intgred[i].strIngredient}</h3>
                          <p>${intgred[i].strDescription.slice(0,100)}</p>
                  </div>
          </div>
          `
      }
  
      meals.innerHTML = cartoona
    }
    //=============================
    getMealByCategory("Seafood")
  async function getMealByCategory(category){
    $(".inner-loading").fadeIn(500)
    $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let result=await data.json();
    // console.log(result.meals)
    displaymeals(result.meals.slice(0, 20))
    $(".inner-loading").fadeOut(500)
    }
    
    function displaymeals(meal){
      let cartona="";
      for(let i=0;i<meal.length;i++){
      cartona +=`
      <div class="col-md-3">
      <div onclick="getMealDetails('${meal[i].idMeal}')" class="category mt-5 h-100 ">
       
        <div  class="meal-img position-relative rounded">
          <div class="layer position-absolute rounded d-flex align-items-center pt-2">
            <h3 class="p-2">${meal[i].strMeal}</h3>
           
          </div>
        <img src="${meal[i].strMealThumb}" class="w-100" alt="meal">
      </div> 
      </div>
      </div>
      `
        }
      meals.innerHTML=cartona
      }

  //==============================
  async function getMealByArea(area){
    $(".inner-loading").fadeIn(500)
  $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let result=await data.json();
    // console.log(result.meals);
    displaymeals(result.meals.slice(0, 20));
    $(".inner-loading").fadeOut(500)
    
    }
  //===============================
  async function getMealByIngredients(ingredient){
    $(".inner-loading").fadeIn(500)
 $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  $("#contact").removeClass("d-flex");
  $("#contact").addClass("d-none");
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    let result=await data.json();
    // console.log(result.meals);
    displaymeals(result.meals.slice(0, 20));
    $(".inner-loading").fadeOut(500)
    
    }
    //=================================
   async function getMealDetails(id){
    $(".inner-loading").fadeIn(500)
    $("#search").removeClass("d-flex");
    $("#search").addClass("d-none");
    $("#contact").removeClass("d-flex");
    $("#contact").addClass("d-none");
      let data= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      let result=await data.json();
      // console.log(result.meals[0]); 
      mealDetails(result.meals[0]);
      $(".inner-loading").fadeOut(500)
      }

      function mealDetails(idmeal){
    
      const recipes = [];
       for (let i = 1; i <= 20; i++) {
       const recipe = idmeal[`strIngredient${i}`];
       const measure = idmeal[`strMeasure${i}`];
       if (recipe) {
      recipes.push(`${measure} ${recipe}`);
       }
      }
    const recipesHtml = recipes
    .map((recipe) => `<li class="alert alert-info m-2 p-1">${recipe}</li>`)
    .join('');

     const tags = idmeal.strTags ? idmeal.strTags.split(',') : [];
      const tagsHtml = tags
     .map((tag) => `<li class="alert alert-danger m-2 p-1">${tag}</li>`)
    .join('');
    
    
    let  cartona=`
      <div class="col-md-3">
      <div class="meal-details-img mt-5 text-white">
        <img src="${idmeal.strMealThumb}" alt="meal" class="w-100 ">
        <h3 class="p-2"> ${idmeal.strMeal}</h3>
      </div>
   </div>
   <div class="col-md-8 mt-5 text-white">
      <h2>Instructions</h2>
      <p>${idmeal.strInstructions}</p>
       <h3>Area : ${idmeal.strArea}</h3>
       <h3>Category : ${idmeal.strCategory}</h3>
       <h3>Recipes :</h3>
       <ul class="list-unstyled d-flex flex-wrap">
       ${recipesHtml}
      
       </ul>
       
       <h3>Tags :</h3>
       <ul class="list-unstyled d-flex flex-wrap">
        
      ${tagsHtml}
       </ul>
      <a href="${idmeal.strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
      <a href="${idmeal.strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
    </div>
      `;
      meals.innerHTML=cartona
      }
   //=======================================
  
  //  console.log(searchInputs)
   function search(){
    $("#search").removeClass("d-none");
    $("#search").addClass("d-flex");
    $("#contact").removeClass("d-flex");
    $("#contact").addClass("d-none");
    meals.innerHTML = ""
   }
   //====================================
 async function searchByName(meal){
  $(".inner-loading").fadeIn(500);
  meals.innerHTML = ""
  meal == "" ? meal = "B" : "";
  let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  let result=await data.json();
  // console.log(result.meals)
  result.meals ? displaymeals(result.meals) : displaymeals([]);
  $(".inner-loading").fadeOut(500);
 }
 //========================================
 async function searchByLetter(letter){
  $(".inner-loading").fadeIn(500);
  meals.innerHTML = ""
  letter == "" ? letter = "a" : "";
  let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  let result=await data.json();
  // console.log(result.meals)
  result.meals ? displaymeals(result.meals) : displaymeals([])
  $(".inner-loading").fadeOut(500);
 }

 //================================================

 let nameFocus = false;
 let emailFocus = false;
 let phoneFocus = false;
 let ageFocus= false;
 let passwordFocus = false;
 let repasswordFocus = false;

function contact() {
    $("#contact").removeClass("d-none");
  $("#contact").addClass("d-flex");
  $("#search").removeClass("d-flex");
  $("#search").addClass("d-none");
  meals.innerHTML = "";



  username.addEventListener("focus", () => {
    nameFocus = true
  })

  useremail.addEventListener("focus", () => {
    emailFocus = true
  })

  userphone.addEventListener("focus", () => {
    phoneFocus = true
  })

  userage.addEventListener("focus", () => {
    ageFocus = true
  })

  userpassword.addEventListener("focus", () => {
    passwordFocus = true
  })

  userrepassword.addEventListener("focus", () => {
    repasswordFocus = true
  })
}

function nameVaildation() {
  let text = username.value;
  let regexname = /^[A-Z a-z]{3,}$/;
  if (regexname.test(text)) {
    
    return true;
  } else {
   
    return false;
  }
}

function emailvaildation() {
  let text = useremail.value;
  let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com)$/;
  if (regexEmail.test(text)) {
  
    return true;
  } else {
 
    return false;
  }
}

function phonevaildation() {
  let text = userphone.value;
  let regexEmail = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regexEmail.test(text)) {
   
    return true;
  } else {
   
    return false;
  }
}

function agevaildation() {
  let text = userage.value;
  let regexEmail = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  if (regexEmail.test(text)) {
    
    return true;
  } else {
    
    return false;
  }
}

function passwordVaildation() {
  var text = userpassword.value;
  var regexpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{4,}$/gm;
  if (regexpass.test(text)) {
   
    return true;
  } else {
    
    return false;
  }
}

function repasswordValidation() {
  if (userrepassword.value == userpassword.value) {
   
    return true;
  } else {
    
    return false;
  }
}

function vaildation() {
  if (nameFocus) {
      if (nameVaildation()) {
            $("#nameMessage").removeClass("d-flex");
            $("#nameMessage").addClass("d-none");

      } else {
             $("#nameMessage").removeClass("d-none");
             $("#nameMessage").addClass("d-flex");

      }
  }
  if (emailFocus) {

      if (emailvaildation()) {
              $("#emailMessage").removeClass("d-flex");
              $("#emailMessage").addClass("d-none");
      } else {
              $("#emailMessage").removeClass("d-none");
              $("#emailMessage").addClass("d-flex");

      }
  }

  if (phoneFocus) {
      if (phonevaildation()) {
             $("#phoneMessage").removeClass("d-flex");
             $("#phoneMessage").addClass("d-none");
      } else {
           $("#phoneMessage").removeClass("d-none");
            $("#phoneMessage").addClass("d-flex");
      }
  }

  if (ageFocus) {
      if (agevaildation()) {
            $("#ageMessage").removeClass("d-flex");
            $("#ageMessage").addClass("d-none");
      } else {
              $("#ageMessage").removeClass("d-none");
              $("#ageMessage").addClass("d-flex");

      }
  }

  if (passwordFocus) {
      if (passwordVaildation()) {
             $("#passMessage").removeClass("d-flex");
            $("#passMessage").addClass("d-none");


      } else {
             $("#passMessage").removeClass("d-none");
             $("#passMessage").addClass("d-flex");

      }
  }
  if (repasswordFocus) {
      if (repasswordValidation()) {
            $("#repassMessage").removeClass("d-flex");
            $("#repassMessage").addClass("d-none");


      } else {
              $("#repassMessage").removeClass("d-none");
              $("#repassMessage").addClass("d-flex");

      }
  }


  if (nameVaildation() &&
  emailvaildation() &&
  phonevaildation() &&
  agevaildation() &&
  passwordVaildation() &&
  repasswordValidation()) {
      submitBtn.removeAttribute("disabled")
  } else {
      submitBtn.setAttribute("disabled", true)
  }
}

$(function () {
  $(".loader").fadeOut(1500, function () {
    $(".loading").slideUp(1500, function () {
      $("body").css("overflow", "auto");
      $(".loading").remove();
      
      $("body").scrollTop(0);
    });
  });
});