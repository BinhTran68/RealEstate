const router = require('express').Router()
const customOTPController = require('../controller/customOTPController')

router.post('/',  customOTPController.createOTP)

module.exports = router