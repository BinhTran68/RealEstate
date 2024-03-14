const router = require('express').Router()
const authController = require('../controller/auth')
const validateDTO = require('../middlewares/validation')
const Joi = require("joi")
const { stringRequired } = require("../middlewares/joiSchema")

// Định nghĩa xong link dẫn

router.post('/register',
             validateDTO(Joi.object({ password: stringRequired, name: stringRequired, phone: stringRequired })), authController.register)


module.exports = router