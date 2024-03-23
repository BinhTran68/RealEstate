// manager router
const { errHandler, badRequestException} = require('../middlewares/errorHandler')
const auth = require('./auth')
const user = require('./user')
const insert = require('./insert')


const innitRouters = (app) => {
    app.use('/api/auth', auth)
    app.use('/api/user', user)
    app.use('/api/insert', insert)

    app.use('/*', badRequestException)
    app.use(errHandler);
}

module.exports = innitRouters