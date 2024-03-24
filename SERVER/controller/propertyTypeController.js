const asyncHandler = require('express-async-handler')
const db = require("../models")
const { createNewPropertyTypeQuery }  = require("../service/propertyTypeService")
const {Op} = require("sequelize");


const createNewPropertyType = asyncHandler(async (req, res, next) => {
    // Client-side -> sendto server 1 string or server side
    const { name } = req.body;
    const response = await createNewPropertyTypeQuery(name, req.body);
    return res.status(response[1] ? 201 : 400).json({
        success:   response[1],
        message: response[1] ? 'Created' : 'Name property duplicated',
        propertyTypeId : response[0]
    })
})

const getPropertyTypes = asyncHandler(async (req, res) => {
    const { limit, page, fields,type, ...query } = req.query
    const options = {};
    if (fields) {
        // have fields then will cut value at  fields "," . then we has attributes = [ ]
        options.attributes = fields.split(",")  // Cut string to array
        // attributes is fields we need get
    }
    if (Object.keys(query).length > 0) {
        const whereClause = Object.keys(query).reduce((acc, key) => {
            if (query[key].includes('%')) {
                acc[key] = { [Op.iLike] : `%${query[key]}%`}  // iLike can find  does not distinguish between uppercase and lowercase letters
                return acc;
            }else {
                acc[key] = query[key] // If do not have % find by =
                return acc;
            }
        }, {})
        options.where = whereClause
    }
    if (type === 'ALL')  {
        const response = await db.PropertyType.findAll({
            where : query,
            ...options
        });
        return res.status(response.length > 0?200:404).json({
            success: response.length > 0,
            message: response ? "Got" : "PropertyType not found !",
            propertyTypes : response
        })
    }else  {
        return res.json({
        })
    }
})


module.exports = {
    createNewPropertyType,
    getPropertyTypes
}


