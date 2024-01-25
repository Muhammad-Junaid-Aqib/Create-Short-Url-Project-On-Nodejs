const express = require('express')
const router = express.Router()

const {
    handlerGenerateNewShortUrl
} = require('../controller/url')

router.post('/', handlerGenerateNewShortUrl)

module.exports = router