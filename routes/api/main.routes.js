
const express = require('express');
const router = express.Router();
const authAPI = require('../../middlewares/authAPI')
const authJWT = require('../../middlewares/authJWT')
var multer = require('multer');
var upload = multer({dest:'uploads/'});
const util = require("util");

const mainController = require('../../controllers/main/main.controller')

const paynetController = require('../../controllers/main/paynet.controller')
router.post('/Payment/processTransaction',[upload.single(''),authAPI.verifyAPIKey,authJWT.verifyToken],paynetController.create)
router.post('/User/createUser',[upload.single(''),authAPI.verifyAPIKey,authJWT.verifyToken],paynetController.createUser)
router.post('/User/getUserbalance',[upload.single(''),authAPI.verifyAPIKey,authJWT.verifyToken],paynetController.getUserBalance)
router.post('/Payment/getTransactionStatus',[upload.single(''),authAPI.verifyAPIKey,authJWT.verifyToken],paynetController.getTransactionStatus)

router.post('/createEmandate',[authAPI.verifyAPIKey,authJWT.verifyToken],mainController.createEmandate)
router.get('/getEmandateStatusById/:id',[authAPI.verifyAPIKey,authJWT.verifyToken],mainController.getEmandateStatusById)

module.exports = router;