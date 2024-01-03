/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


let restaurantOptions = getRestaurants()
//console.log(`RestaurantOptions length: ${restaurantOptions.length}`)

//console.log("Restaurants:")
//console.dir(restaurantOptions)

//this object will store the choices the user selects
let userChoices = {}

let userFoodResults={}


/*---- Cached Element References ----*/

const startBtn = document.querySelector("#start-button")

const submitBtn = document.querySelector("#submit-button")

const timeLeftMessage = document.querySelector("#gameTimer")

const foodOptions = []

const foodTypeChoices = document.querySelector("#foodTypes")

const userPriceLimit = document.querySelector("#maxPrice")

const userCocktails = document.querySelector("#offersCocktails")

const userIndoorDining = document.querySelector("#indoorDining")

const userTakeout = document.querySelector("#takeout")


/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', init)

submitBtn.addEventListener('click', updateRestaurantOptions)

foodTypeChoices.addEventListener('change', updateUserChoices)

userPriceLimit.addEventListener('input', updateUserChoices)

userCocktails.addEventListener('change', updateUserChoices)

userIndoorDining.addEventListener('click', updateUserChoices)

userTakeout.addEventListener('click', updateUserChoices)





/*---- Functions ----*/

function init(){
  //generates options based on what's available in restaurantChoices

  //makes userChoices obj empty since initialized
  userChoices = {}

  /*START OF FOOD OPTIONS */

  //initiate food types options available
  for(let idx=0;idx<restaurantOptions.length;idx++){
    if(!foodOptions.includes((restaurantOptions[idx]).foodType)){
    foodOptions.push(restaurantOptions[idx].foodType)
    }
  }

  //loops through initial food type options from initial restaurant options
  for(let idx=0;idx<foodOptions.length;idx++){
    let item= document.createElement("option")
    foodTypeChoices.appendChild(item)
    item.innerHTML = foodOptions[idx]
    item.setAttribute("value", foodOptions[idx])
   
  //console.log(`Data attribute of ${item} is ${item.getAttribute("data-key")}`)
  }

  /*END OF FOOD OPTIONS */
}

function updateUserChoices(evt){

  //figures out key we're selecting so we can create a property in UserChoices object

  //console.log("UPDATED")
  console.dir(userChoices)
  //console.log(`Clicked: ${evt.target.id}`)

  if((evt.target.checked===true) && (evt.target.id ==="offersCocktails")){

    //console.log("CHECKED")
    userChoices[evt.target.id]=true
  }

  else if((evt.target.checked===false) && (evt.target.id ==="offersCocktails")){

    //console.log("UNCHECKED")
    userChoices[evt.target.id]=false
  }

  else{
    userChoices[evt.target.id]=evt.target.value
  
  }
  
  return userChoices
}

//updates restaurant options based on selections
function updateRestaurantOptions(){

  console.log(`User Choices`)
  console.dir(userChoices)

  userFoodResults  = restaurantOptions.filter((item) => 
  
  (item.foodType===userChoices.foodTypes) && (item.avgPrice<= parseInt(userChoices.maxPrice)) && (item.offersCocktails === userChoices.offersCocktails)
  )

console.log("FILTERED:")
console.dir(userFoodResults)
 
}
