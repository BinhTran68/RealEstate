const asyncHandler = require('express-async-handler')
const db = require("../../../models")
const bcrypt = require("bcrypt")
const { roles } = require("../../../utils/constants");
const propertyTypeService = require("../../properties-type/service/propertyTypeService");


const createNewProperty = asyncHandler(async (req, res, next) => {
    const  response = await db.Role.bulkCreate(roles);

    return res.status(Boolean(response)?200:404).json({
        success: Boolean(response),
        message: user ? 'Got' : 'Cannot get user',
        currentUser : user
    })
})

const getPropertyController = asyncHandler(async (req, res) => {
    const {limit, page, fields, sort, ...query} = req.query
    const response = await propertyTypeService.getPropertyTypes(limit, page, fields, sort, query);
    return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.success ? "Got" : "PropertyType not found!",
        propertyTypes: response.data
    });
})

module.exports = {
    createNewProperty
}