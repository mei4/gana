const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller.js')

router.get('/', userController.loginUser)

module.exports = router