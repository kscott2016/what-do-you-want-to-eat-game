import restaurants from "../data/restaurants.json" with {type: "json"}
//import require from "../node_modules/require"
// const express = require('express')

// const app = express()
// const port = 5500

// app.listen(port, () => console.log(`Server has started on port: ${port}`))

// app.get('/', (req, res) => {
//     res.send('Hello from the backend!');
//   });
  
//   app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
//   });

//   fs.readFile('./submit-restaurant.html', 'utf8', (err, data) => {
//     if (err) {
//       console.error("Error reading the file:", err);
//       return;
//     }
//     console.log("File content:", data);
//   });

/*---- Cached Element References ----*/

let theRestaurants = [] = restaurants

const submitButton = document.querySelector("#new_submit-button")

const newRestaurant = {}

const foodTypeChoiceList = document.querySelector("#foodType")

let foodTypeOptions = document.getElementsByClassName('foodTypeOption')

let foodTypes = listFoodTypes()

//submission form event listeners 

const newName= document.querySelector("#name")

const submissionPriceLimit = document.querySelector("#avgPrice")

const newCocktails = document.querySelector("#offersCocktails")

const newIndoorDining = document.querySelector("#offersIndoorDining")

const newUserTakeout = document.querySelector("#offersTakeout")

const newFoodTypeList= document.querySelector("#foodType")

/*--------- Event Listeners ---------*/

submitButton.addEventListener('click', submitNewRestaurant)

newName.addEventListener('input', updateSubmission)


function listFoodTypes(){
    let theList=[]
    for (let i= 0;i<theRestaurants.length;i++){
        if (!(theList.includes(theRestaurants[i].foodType))){
        theList.push(theRestaurants[i].foodType)
        //console.log("FOOD TYPE: "+theRestaurants[i].foodType)
    }
    }
    theList = theList.sort()
    
    return theList
}

 //loops through current food type options from current restaurant options

for(let idx=0;idx<foodTypes.length;idx++){
    let item= document.createElement("option")
    foodTypeChoiceList.appendChild(item)
    item.innerHTML = foodTypes[idx]
    item.setAttribute("value", foodTypes[idx])
    item.classList.add("foodTypeOption")
}

function updateSubmission(evt){


    //console.log("Target ID: "+evt.target.id)
    //tests if restaurant has been added already

    //restaurant name submission
    let newNameTest = (evt.target.value).toLowerCase()
    //console.log("ID: "+ evt.target.id)

    if ((evt.target.id) === "name"){
        //console.log("REACHED")
        for (let idx=0;idx<theRestaurants.length;idx++){
            //console.log("Restaurant Name: "+ (theRestaurants[idx].name).toLowerCase())

            if(((theRestaurants[idx].name).toLowerCase()) === newNameTest){
                console.log("This restataurant exist!")
                evt.target.value=""
            }
            else{
                newRestaurant.name = theRestaurants[idx].name 
            }
        } 
        newRestaurant[evt.target.id]= evt.target.value
    }

    if((evt.target.id) === "avgPrice"){
        newRestaurant[evt.target.id]= evt.target.value
    }

    //cocktails
    if((evt.target.checked) && (evt.target.id ==="offersCocktails")){

        console.log("Cocktails clicked!");
        newRestaurant[evt.target.id]=true
    }

    if((!(evt.target.checked)) && (evt.target.id ==="offersCocktails")){

        //console.log("Cocktails NOT clicked!");
        newRestaurant[evt.target.id]=false
    }

    //food types

    if((evt.target.id) === "foodType"){
        newRestaurant[evt.target.id]= evt.target.value
    }

    //restaurant image or logo
    if((evt.target.id) === "logoUrl"){
        newRestaurant[evt.target.id]= evt.target.value
    }

    //takeout and dining in
    if((evt.target.value==="true") && ((evt.target.id ==="offersIndoorDining"))){

        //console.log("TakeOut clicked!");
        newRestaurant.offersIndoorDining=true
        newRestaurant.offersTakeout=false
    }

    if((evt.target.value==="true") && ((evt.target.id ==="offersTakeout"))){

        //console.log("TakeOut clicked!");
        newRestaurant.offersIndoorDining=false
        newRestaurant.offersTakeout=true  
    }

    if((evt.target.value==="true") && ((evt.target.id ==="offersBoth"))){
        newRestaurant.offersIndoorDining=true
        newRestaurant.offersTakeout=true  
    }

    if ((evt.target.id) === "logoUrl"){
        //console.log("REACHED")
        newRestaurant.logoUrl= evt.target.value
    }

    submitNewRestaurant(newRestaurant)
    
}

function submitNewRestaurant(newRestaurant){

    theRestaurants.push(newRestaurant)
    console.log("New restaurant added")

    let jsonString = JSON.stringify(newRestaurant)

    fs.writeFile('./data/restaurants.json', jsonString, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Successfully wrote to file");
        }
      });
}