const express = require('express')
const router = express.Router()

const {
    handlerGenerateNewShortUrl,
    handleGetAnalytics,
    handleGetFunction,
} = require('../controller/url')

router.post('/', handlerGenerateNewShortUrl)

router.get('/:shortId', handleGetFunction)

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router