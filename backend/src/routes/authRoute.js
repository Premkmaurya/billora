const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { signupValidation, loginValidation } = require('../middlewares/validation.middleware');

router.post('/register', signupValidation, authController.signup);

router.post('/login', loginValidation, authController.login);

router.get('/me', protect, authController.getUser);

router.all('/logout', authController.logout);

module.exports = router;
