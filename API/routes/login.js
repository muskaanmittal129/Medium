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
            .isEmpty()
            .withMessage('Please enter an e-mail address'),
        check('password')
            .isLength({ min: 8 })
            .withMessage('Password must be 8 characters long')
            .isEmpty()
            .withMessage('Please enter an password'),
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
            .isEmpty()
            .withMessage('Please enter your first name'),
        check('lname')
            .isAlpha()
            .withMessage('Name must contain only alphabets')
            .isEmpty()
            .withMessage('Please enter your last name'),
    ],
    loginController.postSignup
);
router.post(
    '/check-otp',
    check('otp')
        .isLength({ min: 6, max: 6 })
        .withMessage('OTP must be 6 characters long')
        .isEmpty()
        .withMessage('Enter OTP'),
    loginController.postCheckOTP
);
router.post('/resend-otp', loginController.resendOTP);

module.exports = router;