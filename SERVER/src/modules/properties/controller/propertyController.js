const asyncHandler = require('express-async-handler')
const db = require("../../../models")
const bcrypt = require("bcrypt")
const { roles } = require("../../../utils/constants");
const propertiesServices = require("../service/propertiesServices");


const createNewProperty = asyncHandler(async (req, res, next) => {
    const  response = await db.Role.bulkCreate(roles);

    return res.status(Boolean(response)?200:404).json({
        success: Boolean(response),
        message: user ? 'Got' : 'Cannot get user',
        currentUser : user
    })
})

const getProperties = asyncHandler(async (req, res) => {
    const {limit, page, fields, sort, ...query} = req.query
    const response = await propertiesServices.getProperties(limit, page, fields, sort, query);
    return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.success ? "Got" : "Property not found!",
        properties: response.data
    });
})

module.exports = {
    createNewProperty,
    getProperties
}