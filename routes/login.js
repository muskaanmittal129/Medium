const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();

router.post('/signin', loginController.postSignin);
router.post('/signup', loginController.postSignup);

module.exports = router;