const Car = require('../models/carModel')


const getAllCars = async (req, res) => {
  console.log(req.query)
  const cars = await Car.find({})
  res.status(200).json({ count: cars.length, cars })
}

const postCar = async (req, res) => {
  res.status(201).json({ msg: 'car has been created' })
}

const getSingleCar = async (req, res) => {
  const { id } = req.params
  const car = await Car.findById({ _id: id })
  res.status(200).json({ car })
}



module.exports = { getAllCars, getSingleCar, postCar }