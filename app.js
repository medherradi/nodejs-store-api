require('dotenv').config()
require('express-async-errors')
const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const carsRouter = require('./routes/carsRouter')
const app = express()

const mongoDBConnection = process.env.MONGODB_CONNECTION

app.use(express.json())


// routes
app.use('/api/cars', carsRouter)

app.use('*', notFound)

app.use(errorHandler)


const port = process.env.PORT || 3000

const startDB = async () => {
  try {
    await connectDB(mongoDBConnection)
    console.log('connection to mongodb atlas ...')
    app.listen(port, console.log(`server is listening on port ${port}...`))
  }
  catch (error) {
    console.log(error)
  }
}

startDB()