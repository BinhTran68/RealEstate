const {throwErrorWithStatus} = require("./errorHandler");

const validateDTO = (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body)
        if (error)  {
            throwErrorWithStatus(403, error.details[0].message, res, next)
        }
        next()
}


module.exports = validateDTO