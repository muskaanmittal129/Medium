const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const config = require('../util/config');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.sendgrid_key
    }
}));


exports.postSignin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User
        .findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                const error = new Error('Invalid credentials');
                return next(error);
            }
            if (user.verified !== true) {
                const otp = Math.floor(100000 + Math.random() * 900000);
                user.otp = otp;
                user.save()
                    .then(() => {
                        setTimeout(function () {
                            User.findOne({ where: { username: username } })
                                .then(user => {
                                    if (user.otp !== null) {
                                        user.otp = null;
                                        return user.save()
                                    }
                                    return;
                                })
                                .then(() => {
                                    return;
                                })
                                .catch(err => {
                                    const error = new Error(err);
                                    return next(error);
                                });
                        }, 120000);
                        res.status(200).json({
                            message: 'Your mail is not verified. An OTP has been sent on your e-mail address'
                        });
                        transporter.sendMail({
                            to: user.email,
                            from: 'nimish.noida@gmail.com',
                            subject: 'OTP for verification',
                            html: `
                                <p>This email has been used for registration on medium</p>
                                <p>Please enter the OTP given below to verify your mail address</p>
                                <h2>${otp}</h2>
                                <p>The OTP will expire in 2 minutes</p>
                            `
                        });
                    })
                    .catch(err => {
                        const error = new Error(err);
                        return next(error);
                    });
            }
            else {
                bcrypt
                    .compare(password, user.password)
                    .then(doMatch => {
                        if (!doMatch) {
                            const error = new Error('Invalid credentials');
                            return next(error);
                        }
                        const token = jwt.sign({
                            name: `${user.fname} ${user.lname}`,
                            username: user.username,
                        }, config.tokenSecret, {
                            expiresIn: '6h'
                        });
                        res.status(200).json({
                            message: 'signin successful',
                            token: token,
                            username: user.username
                        });
                    })
                    .catch(err => {
                        const error = new Error(err);
                        return next(error);
                    });
            }
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    User
        .findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                const err = new Error('email is already registered');
                return next(err);
            }
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
    User
        .findOne({ where: { username: username } })
        .then(user => {
            if (user) {
                const err = new Error('username already exists');
                return next(err);
            }
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
    const otp = Math.floor(100000 + Math.random() * 900000);
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            User
                .create({
                    username: username,
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: hashedPassword,
                    otp: otp
                })
                .then(() => {
                    setTimeout(function () {
                        User.findOne({ where: { username: username } })
                            .then(user => {
                                if (user.otp !== null) {
                                    user.otp = null;
                                    return user.save()
                                }
                                return;
                            })
                            .then(() => {
                                return;
                            })
                            .catch(err => {
                                const error = new Error(err);
                                return next(error);
                            });
                    }, 120000);
                    res.status(200).json({
                        message: 'Signup was successful. An OTP has been sent on your e-mail address'
                    });
                    transporter.sendMail({
                        to: email,
                        from: 'nimish.noida@gmail.com',
                        subject: 'OTP for verification',
                        html: `
                                <p>This email has been used for registration on medium</p>
                                <p>Please enter the OTP given below to verify your mail address</p>
                                <h2>${otp}</h2>
                                <p>The OTP will expire in 2 minutes</p>
                            `
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};

exports.postCheckOTP = (req, res, next) => {
    const otp = req.body.otp;
    const username = req.body.username;
    const password = req.body.password;
    if (!password) {
        User.findOne({ where: { username: username } })
            .then(user => {
                if (!user) {
                    console.log("user not found");
                    const error = new Error('incorrect username');
                    return next(error);
                }
                if (user.otp !== otp) {
                    const error = new Error('incorrect OTP');
                    return next(error);
                }
                user.otp = null;
                user.verified = 1;
                user.save()
                    .then(() => {
                        res.status(200).json({
                            message: 'verification successful'
                        });
                    })
                    .catch(err => {
                        const error = new Error(err);
                        return next(error);
                    });
            })
            .catch(err => {
                const error = new Error(err);
                return next(error);
            });
    }
    if (password) {
        User.findOne({ where: { username: username } })
            .then(user => {
                if (!user) {
                    const error = new Error('invalid credentials');
                    return next(error);
                }
                if (user.otp !== otp) {
                    const err = new Error('incorrect OTP');
                    return next(err);
                }
                bcrypt
                    .compare(password, user.password)
                    .then(doMatch => {
                        if (!doMatch) {
                            const error = new Error('invalid credentials');
                            return next(error);
                        }
                        const token = jwt.sign({
                            name: `${user.fname} ${user.lname}`,
                            username: user.username,
                        }, config.tokenSecret, {
                            expiresIn: '6h'
                        });
                        user.otp = null;
                        user.verified = 1;
                        user.save()
                            .then(() => {
                                res.status(200).json({
                                    message: 'signin successful',
                                    token: token,
                                    username: user.username
                                });
                            })
                            .catch(err => {
                                const error = new Error(err);
                                return next(error);
                            });
                    })
                    .catch(err => {
                        const error = new Error(err);
                        return next(error);
                    });
            })
            .catch(err => {
                const error = new Error(err);
                return next(error);
            });
    }
};

exports.resendOTP = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const username = req.body.username;
    User.findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                const err = new Error('incorrect username');
                return next(err);
            }
            user.otp = otp;
            user.save()
                .then(() => {
                    setTimeout(function () {
                        if (user.otp !== null) {
                            user.otp = null;
                            user.save()
                                .then(() => {
                                    return;
                                })
                                .catch(err => {
                                    const error = new Error(err);
                                    return next(error);
                                });
                        }
                        return;
                    }, 120000);
                    res.json({
                        message: "otp has been sent"
                    });
                    transporter.sendMail({
                        to: user.email,
                        from: 'nimish.noida@gmail.com',
                        subject: 'OTP for verification',
                        html: `
                            <p>This email has been used for registration on medium</p>
                            <p>Please enter the OTP given below to verify your mail address</p>
                            <h2>${otp}</h2>
                            <p>The OTP will expire in 2 minutes</p>
                        `
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};