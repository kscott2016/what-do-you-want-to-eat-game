/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"

let restaurantOptions = getRestaurants()

//this object will store the choices the user selects
let userChoices = {}

let userFoodResults={}

let winningRestaurant

let timer

let timerInterval

let timeLeft


/*---- Cached Element References ----*/

const startBtn = document.querySelector("#start-button")

const submitButton = document.querySelector("#submit-option")

const timerMessage = document.querySelector("#timer-message")

const restartBtn= document.querySelector("#restartBtn")

const submitBtn = document.querySelector("#submit-button")

let foodOptions = []

const foodTypeChoices = document.querySelector("#foodTypes")

let foodTypeOptions = document.getElementsByClassName('foodTypeOption')

const userPriceLimit = document.querySelector("#maxPrice")

const userCocktails = document.querySelector("#offersCocktails")

const userIndoorDining = document.querySelector("#offersIndoorDining")

const userTakeout = document.querySelector("#offersTakeout")

//declaring variable to button in a condition
let random 

let gameTimer = document.getElementById('game-timer')

let gameContainer = document.getElementById('game-container')

let statusMessage = document.getElementById('game-message')

let winnerSelected =false

const resturantsContainer= document.getElementById('restaurants-container')

/*--------- Event Listeners ---------*/

startBtn.addEventListener('click', restartGame)

submitBtn.addEventListener('click', updateRestaurantOptions)

foodTypeChoices.addEventListener('change', updateUserChoices)

userPriceLimit.addEventListener('input', updateUserChoices)

userCocktails.addEventListener('change', updateUserChoices)

userIndoorDining.addEventListener('click', updateUserChoices)

userTakeout.addEventListener('click', updateUserChoices)

resturantsContainer.addEventListener('click',renderWinner)

restartBtn.addEventListener('click', restartGame )

/*---- Functions ----*/

function initVariables(){

   //makes userChoices obj empty since initialized
  userChoices = {}

  startGame()
}

function startGame(){
  
  startBtn.classList.add("hidden")
  displayGameContainer(gameContainer)
  startGameTimer()
  
  //generates options based on what's available in restaurantChoices

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
    item.classList.add("foodTypeOption")
  }

}

function displayGameContainer(gameContainer){

  gameContainer.classList.remove('inactive')
  gameContainer.classList.add('active-game-container', 'animate__animated', 'animate__zoomInDown')
}

function updateUserChoices(evt){


  //figures out key we're selecting so we can create a property in UserChoices object

  /*------ Handles checkbox for cocktails-------*/
  if((evt.target.checked) && (evt.target.id ==="offersCocktails")){
  
    userChoices[evt.target.id]=true
  }

  else if((!(evt.target.checked)) && (evt.target.id ==="offersCocktails")){

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

function startGameTimer(){

  timeLeft= 60

  timer = setInterval(function() {
    gameTimer.textContent = timeLeft + ' seconds'
    timeLeft -= 1

    timerInterval = setTimeout(() => {
    
      if (timeLeft === 0 && !winnerSelected) {

        displayLoser()
        clearInterval(timer)
      } 
      else if(timeLeft===30 && !winnerSelected){
        timerMessage.innerHTML=`<h3>Halfway done and still no decision, shame!</h3>`
    
      }
      else if (timeLeft>0 && timeLeft <= 1 && !winnerSelected) {

        gameTimer.style.color="red"
        timerMessage.innerHTML=`<h3>All these options and you still can't pick one?</h3>`
      }

      //pause if winner selected

      if(winnerSelected){
        clearInterval(timer);
      }
    }, 1000)
    

}, 1000)


}

function updateGameStatus(){
  if(winnerSelected){
    gameTimer.classList.add('hidden')
    timerMessage.innerHTML=''
    statusMessage.innerHTML=`<h3>You've selected ${winningRestaurant.name}</h3>`

    restartBtn.classList.remove("hidden")
  }

  //if user fields do not match to any resturant 
  else if(userFoodResults.length===0){

    statusMessage.innerHTML=`<h3>No matches found! Try again or receive a random restaurant suggestion</h3><button id="random">Select a random restaurant?</button><img src="https://media2.giphy.com/media/hyyV7pnbE0FqLNBAzs/giphy.gif" class="loser-img animate__animated animate__zoomInLeft">`

    random = document.querySelector("#random")
    random.addEventListener('click', selectRandomRestaurant)

  }
}

function displayLoser(){

  resturantsContainer.innerHTML=''

  timerMessage .innerHTML=''

  submitBtn.disabled = true

  submitBtn.style.opacity= "20%"

  gameTimer.innerHTML="Time's up!"
        
  statusMessage.innerHTML= `<div id="loser-message"><h3>You were too slow to pick a place. Now you and your partner are starving!</h3>
  <img src="https://media1.giphy.com/media/3ohzdNYjPSSEhSxF8Q/giphy.gif" class="loser-img animate__animated animate__bounceInDown"></div>`

  restartBtn.classList.remove("hidden")
}

//updates restaurant options based on selections
function updateRestaurantOptions(){

  userFoodResults  = restaurantOptions.filter((item) => {

  return (item.foodType===userChoices.foodTypes) && (item.avgPrice<= parseInt(userChoices.maxPrice)) && ((item.offersCocktails === userChoices.offersCocktails|| !userChoices.hasOwnProperty('offersCocktails')))&&((userChoices.hasOwnProperty('offersTakeout')&& item.offersTakeout)|| !userChoices.hasOwnProperty('offersTakeout')) && ((userChoices.hasOwnProperty('offersIndoorDining')&& item.offersIndoorDining)|| !userChoices.hasOwnProperty('offersIndoorDining'))}
  
  )
  //if no matches are found
  let isEmpty=(obj)=>{
  
    return Object.keys(obj).length === 0 
  }

  if(isEmpty(userFoodResults)){
    updateGameStatus()
  }
  else{
    
    render(userFoodResults)
  }
}

function selectRandomRestaurant(){

  timerMessage.innerHTML=''

  let randomIdx= Math.floor(Math.random() * restaurantOptions.length)

  let randomRestaurantList = []
  randomRestaurantList.push(restaurantOptions[randomIdx])

  userFoodResults=randomRestaurantList

  random.classList.add("hidden")
  statusMessage.innerHTML=''

  render(userFoodResults)
}

function render(restaurantList){

  let restaurantItem

  resturantsContainer.innerHTML = ''

  //if random button was selected and only one restrant is displayed

  if(restaurantList.length===1){

    statusMessage.innerHTML=`<button id="random">Select another random restaurant?</button>`

    random = document.querySelector("#random")
    random.addEventListener('click', selectRandomRestaurant)

  }

    restaurantList.forEach((result,idx) => {
      
      restaurantItem= document.createElement('div')
      restaurantItem.className="restautant-card"
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

  let restaurantItem 
  let winner

  let itemIdx= evt.target.id

  if(evt.target.classList.contains('winning-choice')){

    winner=userFoodResults[itemIdx]
  }
  
  resturantsContainer.innerHTML = ''

  restaurantItem= document.createElement('div')
    restaurantItem.className="restautant-card"
    restaurantItem.innerHTML = 
    `
      <img src="${winner.logoUrl}" class="restaurant-img">
      <div class="restaurant-info">
      <h3>${winner.name}</h3>
      </div>`

      resturantsContainer.appendChild(restaurantItem)
      winnerSelected=true
      winningRestaurant=winner
      updateGameStatus()
}

function restartGame(){

   //re-initialize items
  //clearInterval(timer)
  statusMessage.textContent=''
  resturantsContainer.textContent=''
  gameTimer.textContent=''
  gameTimer.classList.remove("hidden")
  foodTypeChoices.value=''
  userPriceLimit.value=''
  userCocktails.checked=false
  userIndoorDining.checked= false
  userTakeout.checked= false
  userChoices ={}
  winningRestaurant = null
  winnerSelected =false
  restartBtn.classList.add("hidden")
  submitBtn.disabled = false
  submitBtn.style.opacity= "100%"
  timerMessage.innerHTML=''


  foodOptions=[]

  //checks to see if foodType field options exists 
  if(foodTypeOptions?.length && foodTypeOptions.options){
    for(let idx=foodTypeOptions.options.length-1;idx>=0;idx--){
      
      foodTypeOptions.remove(idx)
    }
  }

  initVariables()

}
