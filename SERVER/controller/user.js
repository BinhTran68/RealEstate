const asyncHandler = require('express-async-handler')
const db = require("../models")
const bcrypt = require("bcrypt")
const {getUserByID} = require("../service/userService");


const getCurrentUser = asyncHandler(async (req, res, next) => {
    const {uuid} = req.user
    const user = await getUserByID(uuid) ;

    return res.status(user?200:404).json({
        success: Boolean(user),
        message: user ? 'Got' : 'Cannot get user',
        currentUser : user
    })
})

module.exports = {
    getCurrentUser
}