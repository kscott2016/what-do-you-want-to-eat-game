/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


const restaurantOptions = getRestaurants()
//console.log(`RestaurantOptions length: ${restaurantOptions.length}`)

console.log("Restaurants:")
console.dir(restaurantOptions)

//this object will store the choices the user selects
let userChoices = {}


/*---- Cached Element References ----*/

const startBtn = document.querySelector("#start-button")

const submitBtn = document.querySelector("#submit-button")

const timeLeftMessage = document.querySelector("#gameTimer")

const userFoodType= document.querySelector("#food-types")

const foodOptions = []

const foodTypeChoices = document.querySelector("#food-types")

/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', init())

userFoodType.addEventListener('click', updateUserSelections(userChoices))




/*---- Functions ----*/

function init(){
  //generates options based on what's available in restaurantChoices

  //makes userChoices obj empty since initialized
  userChoices = {}

  //initiate food types options available
  for(let idx=0;idx<restaurantOptions.length;idx++){
    foodOptions.push(restaurantOptions[idx].foodType)
  }

  console.log(`Food options are: ${foodOptions}`)

  for(let idx=0;idx<foodOptions.length;idx++){
    let item= document.createElement("option")
    item.innerHTML = foodOptions[idx]
  }
}

function updateUserSelections(userChoices){

  userChoices.foodType=userFoodType.value
  //console.log(`UserChoices obj: ${userChoices}`)


}


//removes restaurant options based on selections
function removeRestaurantOptions(restaurantOptions){
  console.log("Removing options")

}

function renderFinalAnswer(){

}

