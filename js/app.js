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

let foodOptions = []

const foodTypeChoices = document.querySelector("#foodTypes")

const userPriceLimit = document.querySelector("#maxPrice")

const userCocktails = document.querySelector("#offersCocktails")

const userIndoorDining = document.querySelector("#offersIndoorDining")

const userTakeout = document.querySelector("#offersTakeout")

const random = document.querySelector("#random")

let gameTimer = document.getElementById('game-timer')

let gameContainer = document.getElementById('game-container')

let statusMessage = document.getElementById('game-message')

let winnerSelected =false

const resturantsContainer= document.getElementById('restaurants-container')

/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', init)

submitBtn.addEventListener('click', updateRestaurantOptions)

foodTypeChoices.addEventListener('change', updateUserChoices)

userPriceLimit.addEventListener('input', updateUserChoices)

userCocktails.addEventListener('change', updateUserChoices)

userIndoorDining.addEventListener('click', updateUserChoices)

userTakeout.addEventListener('click', updateUserChoices)

resturantsContainer.addEventListener('click',renderWinner)


//random.addEventListener('click', selectRandomRestaurant)



/*---- Functions ----*/

function init(){
  
  displayGameContainer(gameContainer)
  startGameTimer()

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

  console.dir(foodOptions)

  //loops through initial food type options from initial restaurant options
  for(let idx=0;idx<foodOptions.length;idx++){
    let item= document.createElement("option")
    foodTypeChoices.appendChild(item)
    item.innerHTML = foodOptions[idx]
    item.setAttribute("value", foodOptions[idx])

  /*END OF FOOD OPTIONS */
  }
}

function displayGameContainer(gameContainer){

  //gameContainer.style.display="flex"

  gameContainer.classList.remove('inactive')
  gameContainer.classList.add('active-game-container', 'animate__animated', 'animate__zoomInDown')


  
  //gameContainer.style.setProperty('--animate-duration', '0.5s')
}

function updateUserChoices(evt){


  //figures out key we're selecting so we can create a property in UserChoices object

  //console.dir(userChoices)
  //console.log("Clicked:" , evt.target)

  /*------ Handles checkbox for cocktails-------*/
  if((evt.target.checked) && (evt.target.id ==="offersCocktails")){
  
    userChoices[evt.target.id]=true
  }

  else if((!(evt.target.checked)) && (evt.target.id ==="offersCocktails")){
    console.log("No cocktails")
   
    userChoices[evt.target.id]=false
  }

   /*------- Handles Takeout and Dining in -------*/

   else if((evt.target.value==="true") && ((evt.target.id ==="offersIndoorDining")|| (evt.target.id ==="offersTakeout"))){
   
    userChoices[evt.target.id]=true
    }

  /*----- Handles other user input fields -----*/ 
  else{
    userChoices[evt.target.id]=evt.target.value
  
  }
  
}

/*----------- Timer ----------*/

let timeLeft= 60

function startGameTimer(){

  gameTimer.classList.remove('inactive')
  gameTimer.classList.add('animate__animated','animate__bounceIn', 'animate__delay-1s')

  let timer = setInterval(function() {
    gameTimer.textContent = timeLeft + ' seconds'
    timeLeft -= 1

    if(timeLeft>0 && timeLeft<10){
      gameTimer.style.color='red'
      
    }

    if (timeLeft === 0) {
      gameTimer.textContent = 'Finished!'
      clearInterval(timer);
    }

    if(timeLeft>0 && winnerSelected){
      clearInterval(timer);

    }

    gameTimer.classList.remove('animate__bounceIn')

}, 1000)
}

//updates restaurant options based on selections
function updateRestaurantOptions(){

  //console.log(`User Choices`)
  //console.dir(userChoices)

  userFoodResults  = restaurantOptions.filter((item) => {

  return (item.foodType===userChoices.foodTypes) && (item.avgPrice<= parseInt(userChoices.maxPrice)) && ((item.offersCocktails === userChoices.offersCocktails|| !userChoices.hasOwnProperty('offersCocktails')))&&((userChoices.hasOwnProperty('offersTakeout')&& item.offersTakeout)|| !userChoices.hasOwnProperty('offersTakeout')) && ((userChoices.hasOwnProperty('offersIndoorDining')&& item.offersIndoorDining)|| !userChoices.hasOwnProperty('offersIndoorDining'))}
  
  )
  //if no matches are found
let isEmpty=(obj)=>{
 
  return Object.keys(obj).length === 0 
}
 

  if(isEmpty(userFoodResults)){
    console.log("No matches found! Try again or receive a random restaurant suggestion")
  }
  else{
    render(userFoodResults)
  }
}


function selectRandomRestaurant(){

  let randomIdx= Math.floor(Math.random() * restaurantOptions.length)

  console.dir(restaurantOptions[randomIdx])


  render(restaurantOptions[randomIdx])

  //return restaurantOptions[randomIdx]
}

function render(restaurantList){

  //console.log("render func reached")

  let restaurantItem

  resturantsContainer.innerHTML = ''

  restaurantList.forEach((result,idx) => {
    //console.log("Item: " + result.name)
    console.dir(result)
   restaurantItem= document.createElement('div')
    restaurantItem.className="restautant-card"
    restaurantItem.id=result.name
    restaurantItem.innerHTML = 
    `
      <img src="${result.logoUrl}" class="restaurant-img">
      <div class="restaurant-info">
      <h3>${result.name}</h3>
      <button class="winning-choice" id=${idx}>I choose this place</button>
      </div>`

      resturantsContainer.appendChild(restaurantItem)
  })

}

function renderWinner(evt){

  //console.log("WINNER SELECTED")
  //console.log(evt.target)
  let restaurantItem 
  let winningRestaurant 
 
  
  let itemIdx= evt.target.id
  //console.log("Id: "+ evt.target.id)
  //console.log("Type: "+ typeof(itemName))

  if(evt.target.classList.contains('winning-choice')){

    console.log(evt.target)
    //console.dir(restaurantOptions)
    // winningRestaurant = userFoodResults.find(element => {
    //   console.dir(element)
    //   return element.name===itemName
    // })
    winningRestaurant=userFoodResults[itemIdx]

    console.log("Selected Winner:")
    console.dir(winningRestaurant)
    
  }
  
  resturantsContainer.innerHTML = ''

  restaurantItem= document.createElement('div')
    restaurantItem.className="restautant-card"
    restaurantItem.innerHTML = 
    `
      <img src="${winningRestaurant.logoUrl}" class="restaurant-img">
      <div class="restaurant-info">
      <h3>${winningRestaurant.name}</h3>
      </div>`

      resturantsContainer.appendChild(restaurantItem)
      winnerSelected=true
}


