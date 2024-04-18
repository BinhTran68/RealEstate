const router = require('express').Router()
const propertyController = require('../modules/properties/controller/propertyController')

const {rateLimiter} = require("../middlewares/rateLimiter");

router.use(rateLimiter)
router.get("/", propertyController.getProperties )


module.exports = router