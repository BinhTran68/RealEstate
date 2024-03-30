const asyncHandler = require('express-async-handler')
const db = require("../models")
const bcrypt = require("bcrypt")
const {throwErrorWithStatus} = require("../middlewares/errorHandler");
const {sign} = require("jsonwebtoken");



// Bọc asyncHandler để xử lí exception và validate
const register = asyncHandler(async (req, res, next) => {
    const {password, phone, name, role} = req.body;
    const response = await db.User.findOrCreate(
        {
            where: {phone: phone},
            defaults: {
                phone, password,name
            }
        })
    const userId = response[0]?.id;
    const roleCode = ['CUSTOMER']
    if (userId) {
        if (role) {
            roleCode.push(role)
        }
        const roleCodeBulk = roleCode.map((role) => ({userId, roleCode: role}))
        const updateRole =  await db.User_Role.bulkCreate(roleCodeBulk);
        if (!updateRole) {
            await  db.User.destroy({where: {id:userId}})
        }
    }
    return res.json({
        success: response[1],
        message: response[1] ? 'Your account is created.' : 'PhoneNumber already had exits'
    })
})


// signIn
const signIn = asyncHandler(async (req, res, next) => {
    const {phone, password} = req.body;
    const user = await db.User.findOne({
        where: {phone}
    })
    if (!user) {
        return throwErrorWithStatus(403, "Vui lòng đăng kí", res, next)
    }
    const isMatchingPassword = bcrypt.compareSync(password, user.password)
    if (!isMatchingPassword) {
        return throwErrorWithStatus(403, "Password is wrong", res, next)
    }
    const token = sign({uuid: user.id, roleCode: user.roleCode}, process.env.JWT_SECRET, {expiresIn: '7d'})

    return res.json({
        success: true,
        message: "Sign in is successfully",
        token: token
    })
})

// Export 1 hàm 
module.exports = {
    register, signIn

}