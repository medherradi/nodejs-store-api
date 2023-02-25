require('dotenv').config()
const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const app = express()






app.use('*', notFound)

app.use(errorHandler)