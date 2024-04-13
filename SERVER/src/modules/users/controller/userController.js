const asyncHandler = require('express-async-handler')
const db = require("../../../models");
const bcrypt = require("bcrypt")
const { getUserByID } = require("../service/userService");


const getCurrentUser = asyncHandler(async (req, res, next) => {
    const {uuid} = req.user
    const user = await getUserByID(uuid) ;

    return res.status(user?200:404).json({
        success: Boolean(user),
        message: user ? 'Got' : 'Cannot get user',
        currentUser : user
    })
})
const getRoles = asyncHandler(async (req, res, next) => {
    const roles = await db.Role.findAll(
        {
            attributes: ["code", "value"]

        }
    )
    return res.status(roles?200:404).json({
        success: Boolean(roles),
        message: roles ? 'Got' : 'Cannot get user',
        roles : roles
    })
})
module.exports = {
    getCurrentUser,
    getRoles
}