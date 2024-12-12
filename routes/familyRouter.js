const { Router } = require('express')
const familyRouter = Router()
const controller = require('../controllers/familyController')

familyRouter.get('/', controller.getAllFamilies)
familyRouter.get('/:familyId', controller.getFamily)

module.exports = familyRouter