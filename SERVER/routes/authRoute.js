const router = require('express').Router()
const authController = require('../controller/auth')
const validateDTO = require('../middlewares/validation')
const Joi = require("joi")
const { stringRequired, string} = require("../middlewares/joiSchema")

// Định nghĩa xong link dẫn

router.post('/signup',
    validateDTO(Joi.object({ password: stringRequired, name: stringRequired, phone: stringRequired, role: string })), authController.register)

router.post('/signin',
    validateDTO(Joi.object({ phone: stringRequired, password: stringRequired })), authController.signIn)


module.exports = router