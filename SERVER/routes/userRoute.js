const router = require('express').Router()
const userController = require('../controller/userController')
const Joi = require("joi")
const { stringRequired, string} = require("../middlewares/joiSchema")
const { verifyToken } = require("../middlewares/verifyToken");


router.get('/current', verifyToken, userController.getCurrentUser )
router.get('/roles', userController.getRoles)


module.exports = router