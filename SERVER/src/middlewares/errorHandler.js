const errHandler = (error, req, res, next) => {
    // const statusCode = 
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        message: error.message
    })
}
const throwErrorWithStatus = (statusCode, message, res, next) => {
    const errorMes = message?.replaceAll(`\"`,  "")
    const error = new Error(errorMes);
    res = res.status(statusCode);
    next(error)
}
const badRequestException = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found.`)
    res.status(404)
    next(error)
}


module.exports = {
    errHandler,
    throwErrorWithStatus,
    badRequestException
}