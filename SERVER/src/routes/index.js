// manager router
const { errHandler, badRequestException} = require('../middlewares/errorHandler')
const auth = require('./authRoute')
const user = require('./userRoute')
const insert = require('./insertRoute')
const propertyType = require('./propertyTypeRoute')


const innitRouters = (app) => {
    app.use('/api/auth', auth)
    app.use('/api/user', user)
    app.use('/api/insert', insert)
    app.use('/api/property-types', propertyType)

    app.use('/*', badRequestException)
    app.use(errHandler);
}

module.exports = innitRouters