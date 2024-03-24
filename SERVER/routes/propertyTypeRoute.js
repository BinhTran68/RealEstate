const router = require('express').Router()
const propertyTypeController = require('../controller/propertyTypeController')
const {verifyToken, isAdmin} = require("../middlewares/verifyToken");
const validateDTO = require('../middlewares/validation')
const Joi = require("joi");
const {stringRequired, string} = require("../middlewares/joiSchema");

router.post('/',
    verifyToken,
    isAdmin,
    validateDTO(Joi.object({
        name: stringRequired,
        description: stringRequired,
        image: stringRequired
    })),
    propertyTypeController.createNewPropertyType)

router.get("/", propertyTypeController.getPropertyTypes)

module.exports = router