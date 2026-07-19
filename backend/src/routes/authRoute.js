const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { signupValidation, loginValidation } = require('../middlewares/validation.middleware');

router.post('/signup', signupValidation, authController.signup);

router.post('/login', loginValidation, authController.login);

router.get('/getUser', protect, authController.getUser);

router.get('/logout', protect, authController.logout);

module.exports = router;
