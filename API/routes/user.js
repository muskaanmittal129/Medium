const express = require('express');
const { check } = require('express-validator/check');

const userController = require('../controllers/user.js');

const router = express.Router();

router.get('/', userController.getUser);
router.post('/change-name', userController.postChangeName);
router.post('/change-username', userController.postChangeUsername);
router.post('/change-password', userController.postChangePassword);
router.post('/change-email', userController.postChangeEmail);
router.post('/delete-profile', userController.postDeleteUser);

module.exports = router;