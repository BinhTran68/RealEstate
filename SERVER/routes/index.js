// Quản lý router
const { errHandler, badRequestException} = require('../middlewares/errorHandler')
const auth = require('./auth')


const innitRouters = (app) => {
    app.use('/api/auth', auth)
    app.use('/*', badRequestException)
    app.use(errHandler);
}


module.exports = innitRouters