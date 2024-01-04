/*-------------------- ---Constants-----------------------*/

import { getRestaurants } from "../data/restaurants.js"


let restaurantOptions = getRestaurants()

//this object will store the choices the user selects
let userChoices = {}

let userFoodResults={}

let foodOptionsCreated= false

let winningRestaurant


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

const random = document.querySelector("#random")

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

random.addEventListener('click', selectRandomRestaurant)

restartBtn.addEventListener('click', restartGame )
//random.addEventListener('click', selectRandomRestaurant)



/*---- Functions ----*/

function initVariables(){
    //re initialize items
  statusMessage.textContent=''
  resturantsContainer.textContent=''
  gameTimer.textContent=''
  gameTimer.classList.add('inactive')
  gameTimer.classList.remove('animate__animated','animate__bounceIn', 'animate__delay-1s')
  restartBtn.classList.add("hidden")

   //makes userChoices obj empty since initialized
  userChoices = {}

  startGame()
}

function startGame(){
  
  displayGameContainer(gameContainer)
  startGameTimer()
  
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

  let timeLeft= 60

  gameTimer.classList.remove('inactive')
  gameTimer.classList.add('animate__animated','animate__bounceIn', 'animate__delay-1s')

  let timer = setInterval(function() {
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
      clearInterval(timer);
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

  else{
    
    // statusMessage.textContent="You were too slow to pick and place. Now you and your partner are starving!"

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
    //console.log("No matches found! Try again or receive a random restaurant suggestion")

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


  render(userFoodResults)

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
  //clear the dropdownn node list of food options
  console.log("Clearing food type options")
  console.dir(foodTypeOptions)
  console.log(`Food Type Options Length: ${foodTypeOptions.length}`)
  if(foodOptions.length>0){
    for(const foodOption of foodTypeOptions){
      foodOption.parentNode.removeChild(foodOption)
    }
    foodTypeOptions=[]
  }

  //call initVariables
  initVariables()

}
