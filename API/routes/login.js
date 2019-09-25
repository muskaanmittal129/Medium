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
            .withMessage('Please enter a valid email address')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter an email address');
                }
                return true;
            }),
        check('password')
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
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            }),
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
    loginController.postSignup
);
router.post(
    '/check-otp/:username',
    check('otp')
        .isLength({ min: 6, max: 6 })
        .withMessage('OTP must be 6 characters long')
        .custom(value => {
            if (value === "") {
                throw new Error('Please enter OTP');
            }
            return true;
        }),
    loginController.postCheckOTP
);
router.post('/resend-otp/:username', loginController.resendOTP);

module.exports = router;