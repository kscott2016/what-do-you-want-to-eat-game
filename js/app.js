/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


const restaurantOptions = getRestaurants()
//console.log(`RestaurantOptions length: ${restaurantOptions.length}`)

//console.log("Restaurants:")
//console.dir(restaurantOptions)

//this object will store the choices the user selects
let userChoices = {
  wantedFoodType:""
}


/*---- Cached Element References ----*/

const startBtn = document.querySelector("#start-button")

const submitBtn = document.querySelector("#submit-button")

const timeLeftMessage = document.querySelector("#gameTimer")

const userFoodType= document.querySelector("#food-types")

const foodOptions = []

const foodTypeChoices = document.querySelector("#food-types")

/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', init())

userFoodType.addEventListener('change', updateUserChoices)




/*---- Functions ----*/

function init(){
  //generates options based on what's available in restaurantChoices

  //makes userChoices obj empty since initialized
  userChoices = {}

  //initiate food types options available
  for(let idx=0;idx<restaurantOptions.length;idx++){
    foodOptions.push(restaurantOptions[idx].foodType)
  }

  //console.log(`Food options are: ${foodOptions}`)

  for(let idx=0;idx<foodOptions.length;idx++){
    let item= document.createElement("option")
    foodTypeChoices.appendChild(item)
    item.innerHTML = foodOptions[idx]
    item.setAttribute("value", foodOptions[idx]);
  }
}

function updateUserChoices(evt){

  //console.log(`Event:`)
  //console.log(this.id)
  let prop= this.id

  //userChoices.wantedFoodType=evt.target.value


  if(prop==="food-types"){
    userChoices[prop]=evt.target.value
    removeRestaurantOptions(userChoices,"food-types",restaurantOptions)
  }

   console.log(`UserChoices obj:`)
   console.dir(userChoices)
}


//removes restaurant options based on selections
function removeRestaurantOptions(userChoices,property,restaurantOptions){
  console.log("Removing options")

  for(let idx=0;idx<restaurantOptions.length;idx++){
    
  }

}

function updateRestaurantChoices(updatedChoices){

  //updates options based on filtered array
  restaurantOptions=updatedChoices

  return restaurantOptions
}

