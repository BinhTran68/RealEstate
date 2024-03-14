const asyncHandler = require('express-async-handler')


const register = asyncHandler(async (req, res) => {
    //  password, phone, name, role = [USER, AGENT]
    // client = urlencode || formdata => req.body
    // client = param ==> req.query 
    // client api/user/:d  =>   req.param
    
    const {password, phone, name, role} = req.body;
    
    return res.json({
        success: true,
        mes: 'API OKI',
        data: { password, phone, name, role } 
    })
})

// Export 1 hàm 
module.exports = {
   register : register
}