const validateDTO = (schema) => (req, res, next) => {
        const { error } = schema.validate(req.body)
       
        if (error) {
            const errorMes = error.details[0].message?.replaceAll(`\"`, "")

            return res.status(403).json({
                success : false,
                mes: errorMes
            })
        }

}

module.exports = validateDTO