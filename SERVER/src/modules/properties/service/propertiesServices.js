const {Op} = require("sequelize");
const redis = require("../../../config/redis.config");
const db = require("../../../models");
const {
    querySortByOptions,
    queryWhereOptions,
    queryPagination,
    executeQuery
} = require("../../../builder-query/executeGetQuery");
const getProperties = async (limit, page, fields, sort, query) => {
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

    options.include =  [
        {model : db.User, as : 'property_user_posted', attributes : ['id','avatar', 'phone', 'name', 'email']},
        {model : db.User, as : 'property_user_owner', attributes : ['id','avatar', 'phone', 'name', 'email']},
        {model : db.Image, as : 'property_images', attributes : ['id', 'link']}
    ]

    const response = await executeQuery(db.Property, query, options);
    result.success = Object.keys(response) && Object.keys(response).length > 0
    result.data = response
    return result;
}

module.exports = {
    getProperties
}