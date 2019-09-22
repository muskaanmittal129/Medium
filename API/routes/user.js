const express = require('express');

const userController = require('../controllers/user.js');

const router = express.Router();

router.get('/:username', userController.getUser);
router.get('/edit-profile', userController.getEditUser);
router.post('/edit-profile', userController.postEditUser);
router.post('/delete-profile', userController.postDeleteUser);

module.exports = router;