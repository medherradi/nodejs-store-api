

const getAllCars = async (req, res) => {
  res.status(200).json({ msg: 'we got all cars' })
}

const postCar = async (req, res) => {
  res.status(201).json({ msg: 'car has been created' })
}

const getSingleCar = async (req, res) => {
  res.status(200).json({ msg: 'we got a single car' })
}



module.exports = { getAllCars, getSingleCar, postCar }