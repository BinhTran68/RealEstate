const db = require("../../../models")
const {Op} = require("sequelize");
const redis = require("../../../config/redis.config")
const {querySortByOptions, queryWhereOptions, executeQuery, queryPagination} = require("../../../builder-query/executeGetQuery");


const createNewPropertyTypeQuery = async (name, values) => {
    return await db.PropertyType.findOrCreate({
            where: {name},
            defaults: values,
        }
    )
}

const getPropertyTypes = async (limit, page, fields, sort, query) => {
    // const alreadyData  = await redis.get("get-property-type");  // Wrong went pagination . Check this page check already bye page
    // if (alreadyData) {
    //     return JSON.parse(alreadyData);
    // }
    const options = {};
    const result = {}
    if (fields) {
        options.attributes = fields.split(",")
    }
    if (sort) {
        options.order = querySortByOptions(sort);
    }
    if (Object.keys(query).length > 0) {
        options.where = queryWhereOptions(query)
    }
    queryPagination(options,limit,page);
    const response = await executeQuery(db.PropertyType, query, options);
    result.success = Object.keys(response) && Object.keys(response).length > 0
    result.data = response
    // redis.set("get-property-type", JSON.stringify(result));
    return result;
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