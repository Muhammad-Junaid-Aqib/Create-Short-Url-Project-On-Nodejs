const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')


const connectToMongoDb = require('./connection')
const URL = require('./models/url')
const {restrictToLoginUserOnly,checkAuth} = require('./middleware/auth')

// import routes
const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/route')
const userRoute = require('./routes/userRoutes')

const app = express()
const PORT = 5000 

// connect to mongodb
connectToMongoDb('mongodb://127.0.0.1:27017/Short-Url').then(() => {
    console.log('Mongodb Connected ..!')
})

// set 
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// middleware 
app.use(express.json()) // parse request body as json
app.use(express.urlencoded({ extended: false })) // parse request body as
app.use(cookieParser())

// connect route
app.use('/url', restrictToLoginUserOnly, urlRoute)

// static routes
app.use('/', checkAuth, staticRoute)

// user routes
app.use('/user', userRoute) 


// static get route
app.get('/test', async (req, res) => { 
    const allUrls = await URL.find({})
    return res.render('home', {
        urls:allUrls
    })
})


// Server display
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})