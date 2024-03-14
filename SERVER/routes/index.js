// Quản lý router
const auth = require('./auth')


const innitRouters = (app) => {

    app.use('/api/auth', auth)

}

module.exports = innitRouters