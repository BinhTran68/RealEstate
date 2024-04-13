const { throwErrorWithStatus } = require("./errorHandler")

const validateDTO = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
        const errorMes = error.details[0].message?.replaceAll(`\"`, "")
        return throwErrorWithStatus(403, errorMes, res, next)
    }
    next()
}
// const validateUniquePhone = async (req, res, next) => {
//     try {
//         const { phone } = req.body;
//         const exitUserByPhone = await User.findOne({where: {phone : req.body.phone}} )
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Lỗi server'
//         })
//     }
// }

module.exports = validateDTO