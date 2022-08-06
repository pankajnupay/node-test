
const express = require('express');
const router = express.Router();
const authAPI = require('../../middlewares/authAPI')
const authJWT = require('../../middlewares/authJWT')

const paynetController = require('../../controllers/main/paynet.controller')

router.post('/createEmandate',[authAPI.verifyAPIKey,authJWT.verifyToken],mainController.createEmandate)
router.get('/getEmandateStatusById/:id',[authAPI.verifyAPIKey,authJWT.verifyToken],mainController.getEmandateStatusById)

module.exports = router;