const db = require("../models")
const {Op} = require("sequelize");
const redis  = require("../config/redis.config")

const createNewPropertyTypeQuery = async (name, values) => {
    return await db.PropertyType.findOrCreate({
            where: {name},
            defaults: values,
        }
    )
}

const getPropertyTypes = async (limit, page, fields, sort, query) => {
    const options = {};
    const result = {}
    if (fields) {
        // have fields then will cut value at  fields "," . then we has attributes = [ ]
        options.attributes = fields.split(",")  // Cut string to array
        // attributes is fields we need get
    }
    // Sorting by
    // Sequalize sort os order = [[createdAt, ASC], [name, DES ], [...]]
    if (sort) {
        const order = sort.split(",").map(el => el.startsWith('-') ? [el.replace("-", ""), 'DESC'] : [el.replace("+", ""), 'ASC'])
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
        const alreadyGetAllPropertyType = await redis.get("getPropertyType");
        if (alreadyGetAllPropertyType) {

            result.success = true
            result.data =  JSON.parse(alreadyGetAllPropertyType)
            return result
        }
        const response = await db.PropertyType.findAll({
            where: query,
            ...options
        });
        result.success = Object.keys(response) && Object.keys(response).length > 0
        result.data = response

        redis.set("getPropertyType", JSON.stringify(result.data))
        return result;
    }
    const prevPage = page - 1 > 0 ? page - 1 : 1
    const offset = prevPage * limit
    // Pagination
    if (offset) {
        options.offset = offset
    }
    options.limit = +limit
    const response = await db.PropertyType.findAndCountAll({
        where: query,
        ...options
    })

    result.success = response.rows && response.rows.length > 0
    result.data = response
    return result
}

const updatePropertyType = async (id, values) => {
    const transaction = await db.sequelize.transaction();
    try {
        const response = await db.PropertyType.update(values, {
            where: {id: id},
            transaction: transaction
        })
        await transaction.commit();
        return response;
    } catch (e) {
        await transaction.rollback()
        throw e
    }
}

const removePropertyType = async (id) => {
    const transaction = await db.sequelize.transaction();
    try {
        const response = await db.PropertyType.destroy({
            where: {id: id},
            transaction: transaction
        });
        await transaction.commit();
        return response;
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
}

module.exports = {
    createNewPropertyTypeQuery,
    removePropertyType,
    updatePropertyType,
    getPropertyTypes
}