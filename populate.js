require('dotenv').config()
const connectDB = require('./db/connect')
const Car = require('./models/carModel')
const jsonCars = require('./cars.json')

const populateDB = async () => {
  try {
    await connectDB(process.env.MONGODB_CONNECTION)
    await Car.deleteMany()
    await Car.create(jsonCars)
    console.log(`mongo data base has been populated with ${jsonCars.length} Car`)
  } catch (error) {
    console.log('something went wrong')
    console.log(error)
  }
}

populateDB()