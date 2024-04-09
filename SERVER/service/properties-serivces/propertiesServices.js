const {Op} = require("sequelize");
const redis = require("../../config/redis.config");
const db = require("../../models");
const getProperty = async (limit, page, fields, sort, query) => {
    const options = {};
    const result = {}
    if (fields) {
        options.attributes = fields.split(",")  // Cut string to array
    }
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
                acc[key] = query[key]
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
        const response = await db.Property.findAll({
            where: query,
            ...options
        });
        result.success = Object.keys(response) && Object.keys(response).length > 0
        result.data = response

        redis.set("properties", JSON.stringify(result.data))
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

module.exports = {
    getProperty
}