const Car = require('../models/carModel')


const getAllCars = async (req, res) => {
  const { name, company, sort, limit, numericFilters } = req.query
  const objQuery = {}
  if (name) {
    objQuery.name = { $regex: name, $options: 'i' }
  }
  if (company) {
    objQuery.company = { $regex: company, $options: 'i' }
  }
  if (numericFilters) {
    console.log(numericFilters)
    const objMapping = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '=': '$eq'
    }
    const regEx = /\b(>|<|>=|<=|=)\b/g
    let replaceString = numericFilters.replace(regEx, (ele) => {
      return `-${objMapping[ele]}-`
    })
    const options = ['price', 'rating']
    replaceString = replaceString.split(',').map((ele) => {
      const [field, operator, value] = ele.split('-')
      if (options.includes(field)) {
        objQuery[field] = { [operator]: Number(value) }
      }
    })
  }
  let data = Car.find(objQuery)
  if (sort) {
    const sortFields = sort.split(',').join(' ')
    data = data.sort(sortFields)
  } else {
    data = data.sort('name')
  }
  if (limit) {
    const numLimit = Number(limit)
    data = data.limit(numLimit)
  }
  console.log(objQuery)
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
  if (!car) {
    return res.status(404).json({ msg: `no car with the given id ${id}` })
  }
  res.status(200).json({ car })
}



module.exports = { getAllCars, getSingleCar, postCar }