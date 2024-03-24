const db = require("../models")
const {throwErrorWithStatus} = require("../middlewares/errorHandler");

const createNewPropertyTypeQuery = async (name, values) => {
    return await db.PropertyType.findOrCreate({
            where:  { name },
            defaults: values,
        }
    )
}

module.exports = {
    createNewPropertyTypeQuery
}