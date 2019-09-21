const express = require('express');

const loginController = require('../controllers/auth');

const router = express.Router();

router.post('/signin', loginController.postSignin);
router.post('/signup', loginController.postSignup);
router.get('/verify-mail/:token', loginController.getVerifyMail);

module.exports = router;