require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const saveForm = require('./form')
const port = process.env.PORT || 8081
const app = express()

async function connect () {
  const options = {
    keepAlive: true,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  try {
    await mongoose.connect(process.env.MLAB_URL, options)
  } catch (err) {
    console.log(err)
  }
  app.listen(port)
  console.log('webhook started on port ' + port)
}

app.post('/forwardForm', saveForm)

connect()
