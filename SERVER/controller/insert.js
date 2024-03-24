const asyncHandler = require('express-async-handler')
const db = require("../models")
const bcrypt = require("bcrypt")
const {roles} = require("../utils/constants");

const insertRoles = asyncHandler(async (req, res, next) => {
    const  response = await db.Role.bulkCreate(roles);

    return res.status(response?200:404).json({
        success: Boolean(response),
        message: response ? 'Inserted' : 'Something went wrongs',
        roles : response
    })
})


const initPropertyType = asyncHandler(async (req, res, next) => {
    const  response = await db.Role.bulkCreate(roles);

    return res.status(response?200:404).json({
        success: Boolean(response),
        message: response ? 'Inserted' : 'Something went wrongs',
        roles : response
    })
})

module.exports = {
    insertRoles,
    initPropertyType
}