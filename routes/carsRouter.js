const express = require('express')
const router = express.Router()
const carsControllers = require('../controllers/carsController')


router.route('/')
  .get(carsControllers.getAllCars)
  .post(carsControllers.postCar)

router.route('/:id')
  .get(carsControllers.getSingleCar)

module.exports = router