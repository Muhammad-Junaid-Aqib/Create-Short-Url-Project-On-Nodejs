const express = require('express')

const connectToMongoDb = require('./connection')
const urlRoute = require('./routes/route')

const app = express()
const PORT = 5000 

// connect to mongodb
connectToMongoDb('mongodb://127.0.0.1:27017/Short-Url').then(() => {
    console.log('Mongodb Connected ..!')
})


// middleware 
app.use(express.json()) // parse request body as json

// connect route
app.use('/url', urlRoute)

// Server display
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})