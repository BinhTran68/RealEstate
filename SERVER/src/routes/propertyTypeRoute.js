const router = require('express').Router()
const propertyTypeController = require('../modules/properties-type/controller/propertyTypeController')
const {verifyToken, isAdmin} = require("../middlewares/verifyToken");
const validateDTO = require('../middlewares/validation')
const Joi = require("joi");
const {stringRequired, string} = require("../middlewares/joiSchema");
const {rateLimiter} = require("../middlewares/rateLimiter");


router.use(rateLimiter)
router.post('/',
    verifyToken,
    // isAdmin,
    validateDTO(Joi.object({
        name: stringRequired,
        description: stringRequired,
        image: stringRequired
    })),
    propertyTypeController.createNewPropertyType)

router.get("/", propertyTypeController.getPropertyTypesController)
router.patch("/:id",
    verifyToken,
    isAdmin,
    validateDTO(Joi.object({
        name: string,
        description: string,
        image: string
    })),
    propertyTypeController.updatePropertyTypes)

router.delete("/:id",verifyToken, isAdmin, propertyTypeController.removePropertyTypes)


module.exports = router