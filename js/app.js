/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


let restaurantOptions = getRestaurants()

//this object will store the choices the user selects
let userChoices = {}

let userFoodResults={}

let winningRestaurant

let timer

let timeLeft


/*---- Cached Element References ----*/

const startBtn = document.querySelector("#start-button")

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

//restartBtn.addEventListener('click', initVariables )

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

  console.log("Timer: ", timer)
  console.log("Time Left: ", timeLeft)
  
  //generates options based on what's available in restaurantChoices

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
    item.classList.add("foodTypeOption")

  /*END OF FOOD OPTIONS */
  }

}

function displayGameContainer(gameContainer){

  gameContainer.classList.remove('inactive')
  gameContainer.classList.add('active-game-container', 'animate__animated', 'animate__zoomInDown')
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

function startGameTimer(){

  timeLeft= 60

  timer = setInterval(function() {
    gameTimer.textContent = timeLeft + ' seconds'
    timeLeft -= 1

    if(timeLeft>0 && timeLeft<10){
      gameTimer.style.color='red'
    }

    else if(timeLeft ===10)
    {
      updateGameStatus(timeLeft)

    }

    else if(timeLeft ===30)
    {
      updateGameStatus(timeLeft)

    }
    else if (timeLeft === 0) {
      gameTimer.textContent = 'Times up!'
      clearInterval(timer)
      console.log(timer)
      updateGameStatus()
    }

}, 1000)
}

function updateGameStatus(timeLeft){
  if(winnerSelected){
    statusMessage.textContent=`You've selected ${winningRestaurant.name}`

    restartBtn.classList.remove("hidden")
  }

  else if(timeLeft===10){

    statusMessage.innerHTML=`<img src="https://media0.giphy.com/media/fwcGzF1l2cILe/giphy.gif" class="loser-img animate__animated animate__zoomInLeft"><h3>All these options and you still can't pick one?</h3>`
    
  }

  else if(timeLeft===30){
    statusMessage.innerHTML=`<img src="https://i.pinimg.com/originals/b8/20/d2/b820d2ca59e7ff357d11e1cfa9a896c1.gif" class="loser-img animate__animated animate__zoomInLeft"><h3>Halfway done and still no decision, shame</h3>`
  }

  //if user fields do not match to any resturant 
  else if(userFoodResults.length===0){

    statusMessage.innerHTML=`<h3>No matches found! Try again or receive a random restaurant suggestion</h3><button id="random">Select a random restaurant?</button><img src="https://media2.giphy.com/media/hyyV7pnbE0FqLNBAzs/giphy.gif" class="loser-img animate__animated animate__zoomInLeft">`

    random = document.querySelector("#random")
    random.addEventListener('click', selectRandomRestaurant)
    
    
  }

  else{
    
    statusMessage.innerHTML= `<div id="loser-message"><h3>You were too slow to pick a place. Now you and your partner are starving!</h3>

    <img src="https://media1.giphy.com/media/3ohzdNYjPSSEhSxF8Q/giphy.gif" class="loser-img animate__animated animate__zoomInLeft"></div>`

    restartBtn.classList.remove("hidden")
  }

  
  
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
    console.log("No matches found! Try again or receive a random restaurant suggestion")

    updateGameStatus()
    

  }
  else{
    console.dir(userFoodResults)
    render(userFoodResults)
  }
}

function selectRandomRestaurant(){

  let randomIdx= Math.floor(Math.random() * restaurantOptions.length)

  let randomRestaurantList = []
  randomRestaurantList.push(restaurantOptions[randomIdx])

  userFoodResults=randomRestaurantList

  random.classList.add("hidden")
  statusMessage.innerHTML=''

  console.log("Game Status elem: ")
  console.dir(statusMessage)
  render(userFoodResults)
}

function render(restaurantList){

  let restaurantItem

  resturantsContainer.innerHTML = ''
    restaurantList.forEach((result,idx) => {
      console.dir(result)
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
  clearInterval(timer)
  statusMessage.textContent=''
  resturantsContainer.textContent=''
  gameTimer.textContent=''
  foodTypeChoices.value=''
  userPriceLimit.value=''
  userCocktails.checked=false
  userIndoorDining.checked= false
  userTakeout.checked= false
  userChoices ={}
  winningRestaurant = null
  winnerSelected =false
  restartBtn.classList.add("hidden")

  foodOptions=[]

  //checks to see if foodType field options exists 
  if(foodTypeOptions?.length && foodTypeOptions.options){
    for(let idx=foodTypeOptions.options.length-1;idx>=0;idx--){
      console.log("The option is:",foodTypeOptions[idx])
      foodTypeOptions.remove(idx)
    }
  }
  
  initVariables()

  console.log("Foodtype options length: ", foodTypeOptions.length)

}
