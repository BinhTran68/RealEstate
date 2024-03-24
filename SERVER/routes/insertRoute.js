const router = require('express').Router()
const insertRoleController = require('../controller/insert')


router.post('/roles',  insertRoleController.insertRoles )


module.exports = router