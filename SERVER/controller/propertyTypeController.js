const asyncHandler = require('express-async-handler')
const propertyTypeService = require("../service/propertyTypeService")
const {throwErrorWithStatus} = require("../middlewares/errorHandler");


const createNewPropertyType = asyncHandler(async (req, res) => {
    // Client-side -> sendto server 1 string or server side
    const {name} = req.body;
    const response = await propertyTypeService.createNewPropertyTypeQuery(name, req.body);
    return res.status(response[1] ? 201 : 400).json({
        success: response[1],
        message: response[1] ? 'Created' : 'Name property duplicated',
        propertyTypeId: response[0]
    })
})

const getPropertyTypesController = asyncHandler(async (req, res) => {
    const {limit, page, fields, sort, ...query} = req.query
    const response = await propertyTypeService.getPropertyTypes(limit, page, fields, sort, query);
    return res.status(response.success ? 200 : 404).json({
        success: response.success,
        message: response.success ? "Got" : "PropertyType not found!",
        propertyTypes: response.data
    });
})

const updatePropertyTypes = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    if (Object.keys(req.body).length === 0) {
        return throwErrorWithStatus(400, "Need less an argument", res, next)
    }
    const response = await propertyTypeService.updatePropertyType(id, req.body)
    return res.status(response ? 201 : 400).json({
        success: response > 0,
        message: response > 0 ? "Updated" : "No. No data is update",
    })
})

const removePropertyTypes = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    const response = await propertyTypeService.removePropertyType()
    return res.status(response ? 200 : 400).json({
        success: response > 0,
        message: response > 0 ? "Deleted" : "No. No data is deleted",
    });
})


module.exports = {
    createNewPropertyType,
    getPropertyTypesController,
    updatePropertyTypes,
    removePropertyTypes
}


