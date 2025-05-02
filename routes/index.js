import { Router } from 'express'
import restaurants from "../data/restaurants.json" with {type: "json"}

const router = Router()

router.get('/', function(req, res) {
    //res.send('Home Pag2e')
    res.render('index', { 
        restaurants: restaurants,
        title: 'Home Page' })
})

export {
    router
}