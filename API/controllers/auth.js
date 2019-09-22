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
            if(user.verified !== true){
                const error = new Error('You have not yet verified you e-mail. Please verify your e-mail to continue');
                return next(error);
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        const error = new Error('Invalid credentials');
                        return next(error);
                    }
                    const token = jwt.sign({
                        name: `${user.first_name} ${user.last_name}`,
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
    if(!errors.isEmpty()){
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
    crypto.randomBytes(8, (err, buffer) => {
        if (err) {
            return next(err);
        }
        const token = buffer.toString('hex');
        bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                User
                    .create({
                        username: username,
                        first_name: fname,
                        last_name: lname,
                        email: email,
                        password: hashedPassword,
                        verificationToken: token
                    })
                    .then(() => {
                        res.status(200).json({
                            message: 'Signup was successful. A mail has been sent to your e-mail address. Click on the link to verify your email address'
                        });
                        transporter.sendMail({
                            to: email,
                            from: 'medium@siproject.com',
                            subject: 'Verification Link',
                            html: `
                                <p>This email has been used for registration on medium</p>
                                <p>Click the link given below to verify your email address</p>
                                <p>This verfication link is valid only for 1 day</p>
                                <a href="https://29111851.ngrok.io/verify-mail/${token}">https://29111851.ngrok.io/verify-mail/${token}</a>
                            `
                        })
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
};

exports.getVerifyMail = (req, res, next) => {
    const token = req.params.token;
    User.findOne({ where: { verificationToken: token } })
        .then(user => {
            if (!user) {
                res.redirect('http://localhost:4200/', 410);
            }
            user.verified = 1;
            user.verificationToken = null;
            user.save()
                .then(() => {
                    res.redirect('http://localhost:4200/', 200);
                })
                .catch();
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};