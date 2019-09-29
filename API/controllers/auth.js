const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Token = require('../models/token');
const config = require('../util/config');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.sendgrid_key
    }
}));

exports.postSignin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let token;
    User
        .findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                const error = new Error('Invalid credentials');
                return next(error);
            }
            if (!user.verified) {
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
                        res.status(401).json({
                            message: 'Your email is not verified. Enter OTP to continue',
                            username: username
                        });
                        transporter.sendMail({
                            to: user.email,
                            from: 'nimishb2000@gmail.com',
                            subject: 'OTP for verification',
                            html: `
                                <h3>Hi ${user.username}</h3>
                                <p>You have not yet verified your e-mail on our website</p>
                                <p>Please enter the OTP given below to verify your e-mail address</p>
                                <p>The OTP will expire in 2 minutes</p>
                                <h2>${otp}</h2>
                                <p>If you didn't request the OTP, please ignore this mail</p>
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
                        token = jwt.sign({
                            name: `${user.fname} ${user.lname}`,
                            userId: user.id
                        }, config.tokenSecret);
                        const insert_token = new Token({
                            token: token,
                            userId: user.id
                        });
                        return insert_token.save();
                    })
                    .then(() => {
                        res.status(200).json({
                            message: 'signin successful',
                            token: token,
                            username: username
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
                const error = new Error('email is already registered');
                return next(error);
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
                const error = new Error('username already exists');
                return next(error);
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
                    name: fname + ' ' + lname,
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
                        message: 'Signup was successful. An OTP has been sent on your e-mail address',
                        username: username
                    });
                    transporter.sendMail({
                        to: email,
                        from: 'nimishb2000@gmail.com',
                        subject: 'OTP for verification',
                        html: `
                                <h3>Hi ${user.username}</h3>
                                <p>Please enter the OTP given below to verify your e-mail address</p>
                                <p>The OTP will expire in 2 minutes</p>
                                <h2>${otp}</h2>
                                <p>If you didn't request the OTP, please ignore this mail</p>
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
    const username = req.params.username;
    User.findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                console.log("user not found");
                const error = new Error('incorrect username');
                return next(error);
            }
            if (otp !== user.otp) {
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
};

exports.resendOTP = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const username = req.params.username;
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
                        from: 'nimishb2000@gmail.com',
                        subject: 'OTP for verification',
                        html: `
                                <h3>Hi ${user.username}</h3>
                                <p>Your new OTP is provided below</p>
                                <p>The OTP will expire in 2 minutes</p>
                                <h2>${otp}</h2>
                                <p>If you didn't request the OTP, please ignore this mail</p>
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

exports.signOut = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    if (!user) {
                        const error = new Error('User not found');
                        return next(error);
                    }
                    Token.findOne({ where: { token: token } })
                        .then(fetched_token => {
                            if (!fetched_token) {
                                const error = new Error('Token not valid');
                                return next(error);
                            }
                            fetched_token.destroy();
                            res.json({
                                message: 'Logged out'
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
        });
    }
    else {
        const err = new Error('Token is not provided');
        return next(err);
    }
};

exports.signOutfromAllDevices = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    if (!user) {
                        const error = new Error('User not found');
                        return next(error);
                    }
                    Token.findAll({ where: { userId: user.id } })
                        .then(allTokens => {
                            if (allTokens.length <= 0) {
                                const error = new Error('Token not valid');
                                return next(error);
                            }
                            allTokens.forEach(element => {
                                element.destroy();
                            });
                            res.json({
                                message: 'Logged out'
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

        });
    }
    else {
        const err = new Error('Token is not provided');
        return next(err);
    }
};