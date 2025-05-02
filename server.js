//THIS Non routing option WORKS

// import restaurants from "./data/restaurants.json" with {type: "json"}
// import * as fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'
// const filePath = './data/restaurants.json'
// const jsonData = fs.readFileSync(filePath, 'utf-8')

// const data = JSON.parse(jsonData);
// console.log(`Data parsed: ${data[6].name}`)

// import express from 'express'

// // // import routes
// import { router as indexRouter } from './routes/index.js'
// import { router as submitRouter } from './routes/submit.js'


// // configure the app (app.set)

// //create Express app
// const app = express()

// const port = 5500
// app.listen(port)

// app.set('view engine','ejs')

// app.use(
//   express.static(
//     path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
//   )
// )

// // index page 
// app.get('/', function(req, res) {
  
//   res.render('index', {
//     restaurants:restaurants,
//     title: 'Home Page'
//   });
// });

// // submit page
// app.get('/submit', function(req, res) {
//   res.render('submit'),{
//     restaurants:restaurants
//   }
// })

//END OF Non routing option 

// import npm packages
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import createError from 'http-errors'
import logger from 'morgan'
import methodOverride from 'method-override'


// import routers
import { router as indexRouter } from './routes/index.js'
import { router as submitRouter } from './routes/submit.js'

// create the express app
const app = express()
const port = 5500
app.listen(port);
console.log(`Server is listening on port ${port}`)

// view engine setup
app.set('view engine', 'ejs')


// basic middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))

// mount imported routes
app.use('/', indexRouter)
app.use('/submit', submitRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export { app }