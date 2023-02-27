const Car = require('../models/carModel')


const getAllCars = async (req, res) => {
  const { name, company, sort } = req.query
  const objQuery = {}
  if (name) {
    objQuery.name = { $regex: name, $options: 'i' }
  }
  if (company) {
    objQuery.company = { $regex: company, $options: 'i' }
  }
  let data = Car.find(objQuery)
  if (sort) {
    const sortFields = sort.split(',').join(' ')
    data = data.sort(sortFields)
  } else {
    data = data.sort('name')
  }
  const cars = await data
  if (cars.length < 1) {
    return res.status(200).json({ count: cars.length, msg: 'no cars to display' })
  }
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