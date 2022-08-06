
const express = require('express');
const router = express.Router();
const authAPI = require('../../middlewares/authAPI')
const authController = require('../../controllers/auth/auth.controller')

router.get('/generateToken',[authAPI.verifyAPIKey],authController.generateToken)

module.exports = router;