// manager router
const { errHandler, badRequestException} = require('../middlewares/errorHandler')
const auth = require('./auth')
const user = require('./user')


const innitRouters = (app) => {
    app.use('/api/auth', auth)
    app.use('/api/user', user)

    app.use('/*', badRequestException)
    app.use(errHandler);
}

module.exports = innitRouters