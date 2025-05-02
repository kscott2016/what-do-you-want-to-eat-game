import { Router } from 'express'
import restaurants from "../data/restaurants.json" with {type: "json"}

const router = Router()

router.get('/', function (req, res) {
    //res.send('Submit Form')
    res.render('submit'), {
        restaurants:restaurants,
        title: 'Submit Page'
    }
})

export {
    router
}