const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'car name must be provided'],
    maxlength: [20, 'name must be less than 15 characters']
  },
  price: {
    type: Number,
    required: [true, 'price must be provided'],
    min: [20000, 'Must be at least $20000, got {VALUE}'],
    max: [75000, 'Must be greater than $75000, got {VALUE}']
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'rating must be greater than or equal to 1'],
    max: [5, 'rating must be less than or equal to 5']
  },
  company: {
    type: String,
    required: [true, 'company must be provided'],
    minlength: [2, 'must be greater than 2 characters'],
    maxlength: [20, 'name must be less than 20 characters']
  },
  country: {
    type: String,
    enum: ['Morocco', 'Japan', 'United States', 'Germany'],
    default: 'Morocco'
  }
})

const Car = mongoose.model('Car', carSchema)

module.exports = Car