const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup',authController.signup);

router.post('/login',authController.login);

router.get('/getUser',authController.getUser);

router.get('/logout',authController.logout);


module.exports = router;
