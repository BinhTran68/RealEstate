const router = require('express').Router()
const insertRoleController = require('../modules/insert-data/insert')


router.post('/roles',  insertRoleController.insertRoles )


module.exports = router