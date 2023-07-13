const express = require('express')
const AuthController = require('../controller/auth')

const router = express.Router();

router.post('/login', AuthController.loginUser)
router.post('/admin', AuthController.registerAdmin);
router.post('/worker', AuthController.registerWorker)

module.exports = router