const express = require('express');
const { check } = require('express-validator/check');

const userController = require('../controllers/user.js');

const router = express.Router();

router.get('/', userController.getUser);
router.get('/bookmarks', userController.getBookmarks);
router.post(
    '/change-name',
    [
        check('fname')
            .isAlpha()
            .withMessage('Name must contain only alphabets')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter your first name');
                }
                return true;
            }),
        check('lname')
            .isAlpha()
            .withMessage('Name must contain only alphabets')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter your last name');
                }
                return true;
            }),
    ],
    userController.postChangeName
);
router.post('/change-username', userController.postChangeUsername);
router.post(
    '/change-password',
    [
        check('newPassword')
            .isLength({ min: 8 })
            .withMessage('Password must be 8 characters long')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter a password');
                }
                return true;
            }),
        check('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
    ],
    userController.postChangePassword
);
router.post(
    '/change-email',
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .custom(value => {
            if (value === "") {
                throw new Error('Please enter an email address');
            }
            return true;
        }),
    userController.postChangeEmail
);
router.post('/delete-profile', userController.postDeleteUser);

module.exports = router;