const { Router } = require('express')
const indexRouter = Router()
const controller = require('../controllers/indexController')

indexRouter.get('/', controller.getCounts)

module.exports = indexRouter