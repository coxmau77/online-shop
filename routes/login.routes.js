const express = require('express');
const router = express.Router();
const loginController = require('../controller/login.controller');

router.post('/verificar-correo', loginController.userValidate);


module.exports = router;