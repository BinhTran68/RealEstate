const asyncHandler = require('express-async-handler')
const db = require("../models")


// Bọc asyncHandler để xử lí exception và validate
const register = asyncHandler(async (req, res) => {
    const {password, phone, name, role} = req.body;
    
    const response = await db.User.findOrCreate({where: {phone: phone}, defaults: req.body })

    console.log(response);

    return res.json({
        success: true,
        mes: 'API OKI',
    })
})

// Export 1 hàm 
module.exports = {
   register : register
}