const errHandler = (error, req, res, next) => {
    // const statusCode = 
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        mes: error.message
    })
}


const throwErrorWithStatus = (statusCode, message, res, next) => {
    const error = new Error(message);
    res = res.status(statusCode);
    next(error)
}


module.exports = {
    errHandler,
    throwErrorWithStatus
}