const express = require('express');
const { check } = require('express-validator/check');

const userController = require('../controllers/user.js');

const router = express.Router();

router.post('/change-password', userController.postChangePassword);
router.post('/delete-profile', userController.postDeleteUser);
router.get('/', userController.getUser);

module.exports = router;