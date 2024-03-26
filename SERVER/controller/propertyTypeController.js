const asyncHandler = require('express-async-handler')
const db = require("../models")
const {createNewPropertyTypeQuery} = require("../service/propertyTypeService")
const {Op} = require("sequelize");
const {throwErrorWithStatus} = require("../middlewares/errorHandler");
const net = require("net");


const createNewPropertyType = asyncHandler(async (req, res) => {
    // Client-side -> sendto server 1 string or server side
    const {name} = req.body;
    const response = await createNewPropertyTypeQuery(name, req.body);
    return res.status(response[1] ? 201 : 400).json({
        success: response[1],
        message: response[1] ? 'Created' : 'Name property duplicated',
        propertyTypeId: response[0]
    })
})

const getPropertyTypes = asyncHandler(async (req, res) => {
    const {limit, page, fields, sort, ...query} = req.query
    const options = {};
    if (fields) {
        // have fields then will cut value at  fields "," . then we has attributes = [ ]
        options.attributes = fields.split(",")  // Cut string to array
        // attributes is fields we need get
    }

    // Sorting by
    // Sequalize sort os order = [[createdAt, ASC], [name, DES ], [...]]
    if (sort) {
        const order = sort.split(",").map(el => el.startsWith('-')  ? [el.replace("-", ""), 'DESC'] : [el.replace("+", ""), 'ASC'])
        options.order = order
    }

    if (Object.keys(query).length > 0) {
        const whereClause = Object.keys(query).reduce((acc, key) => {
            if (query[key].includes('%')) {
                acc[key] = {[Op.iLike]: `%${query[key]}%`}  // iLike can find  does not distinguish between uppercase and lowercase letters
                return acc;
            } else {
                acc[key] = query[key] // If do not have % find by =
                return acc;
            }
        }, {})
        options.where = whereClause
    }
    if (!limit) {
        const response = await db.PropertyType.findAll({
            where: query,
            ...options
        });
        return res.status(response.length > 0 ? 200 : 404).json({
            success: response.length > 0,
            message: response ? "Got" : "PropertyType not found !",
            propertyTypes: response
        })
    }

    const prevPage = page - 1 > 0 ? page - 1 : 1
    const offset = prevPage * limit

    // Pagination
    if (offset) {
        options.offset = offset
    }
    options.limit = +limit
    console.log(options)
    const response = await db.PropertyType.findAndCountAll({
        where: query,
        ...options
    })
    return res.status(response.rows.length > 0 ? 200 : 404).json({
        success: response.rows.length > 0,
        message: response ? "Got" : "PropertyType not found !",
        propertyTypes: response
    })
})

const updatePropertyTypes = asyncHandler(async (req, res, next) => {
    // Client-side -> sendto server 1 string or server side
    // sequelize transaction
    const transaction = await db.sequelize.transaction();
    try {
        const { id } = req.params
        if (Object.keys(req.body).length  === 0 ) {
            return  throwErrorWithStatus(400, "Need less an argument", res, next)
        }
        const response = await db.PropertyType.update( req.body, {
            where: { id : id },
            transaction: transaction
        })
        await transaction.commit();
        return res.status(response ? 201 : 400).json({
            success: response > 0,
            message: response > 0 ? "Updated" : "No. No data is update",
        })
    }catch (e) {
        await transaction.rollback()
        return  throwErrorWithStatus(400, "Wrong save by database", res, next)
    }

})

const removePropertyTypes = asyncHandler(async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { id } = req.params
        const response = await db.PropertyType.destroy(
            { where: { id : id },
            transaction: transaction
        })
        console.log(response);
        await transaction.commit();
        return res.status(response ? 200 : 400).json({
            success: response > 0,
            message: response > 0 ? "Deleted" : "No. No data is deleted",
        })
    }catch (e) {
        await transaction.rollback()
        return  throwErrorWithStatus(400, "Wrong save by database", res, next)
    }

})




module.exports = {
    createNewPropertyType,
    getPropertyTypes,
    updatePropertyTypes,
    removePropertyTypes
}


