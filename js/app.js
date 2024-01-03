/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


let restaurantOptions = getRestaurants()
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

const foodOptions = []

const foodTypeChoices = document.querySelector("#foodTypes")

const userPriceLimit = document.querySelector("#price-range")

/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', init())

foodTypeChoices.addEventListener('change', updateUserChoices)

userPriceLimit.addEventListener('input', updateUserChoices)


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
   item.setAttribute("data-key", "foodType")
  //console.log(`Data attribute of ${item} is ${item.getAttribute("data-key")}`)
  }

  /*END OF FOOD OPTIONS */
}

function updateUserChoices(evt){

  console.log(`Event data attribute:`)
  //let option = this.getElementsByTagName("option");
//console.log(option)
  console.dir(`${evt.target.getAttribute('data-key')}`)

  //figures out key we're selecting so we can create a property in UserChoices object

  let key= this.id
  userChoices[key]=evt.target.value

  updateRestaurantOptions(userChoices,key,restaurantOptions)
  
}

//updates restaurant options based on selections
function updateRestaurantOptions(userChoices,key,restaurantOptions){
  console.log("Removing options")
  console.log(`Return less than ${userChoices[key]}`)

  let updatedOptions={}
  

  
  //filters restaurants based on user's price
  if(key==="price-range"){
    updatedOptions = restaurantOptions.filter(function(item){
    return (item.avgPrice<=parseInt(userChoices[key]))})
    }



   console.dir(updatedOptions)

  return updatedOptions
}

