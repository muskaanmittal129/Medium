const express = require('express');
const { check } = require('express-validator/check');

const loginController = require('../controllers/auth');

const router = express.Router();

router.post('/signin', loginController.postSignin);
router.post(
    '/signup',
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email address'),
        check('password')
            .custom((value, { req }) => {
                if (value.length < 8) {
                    throw new Error('Password must be atlease 8 characters long');
                }
                return true;
            }),
        check('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Please enter a valid email address');
                }
                return true;
            }),
        check('fname')
            .isAlpha()
            .withMessage('Name must contain only alphabets'),
        check('lname')
            .isAlpha()
            .withMessage('Name must contain only alphabets'),
    ],
    loginController.postSignup
);
router.get('/verify-mail/:token', loginController.getVerifyMail);

module.exports = router;