import restaurants from "../data/restaurants.json" with {type: "json"}
import * as fs from 'fs'
const filePath = '../data/restaurants.json'
const jsonData = fs.readFileSync(filePath, 'utf-8')

const data = JSON.parse(jsonData);
console.log(`Data parsed: ${data[6].name}`)

import express from 'express'

// configure the app (app.set)

//create Express app
const app = express()

app.set('view engine','ejs')

const port = 5501

// index page 
app.get('/', function(req, res) {
  
  res.render('pages/home', {
    restaurants:restaurants
  });
});

// submit page
app.get('/submit', function(req, res) {
  res.render('pages/submit'),{
    restaurants:restaurants
  }
})

app.listen(port);
console.log(`Server is listening on port ${port}`)