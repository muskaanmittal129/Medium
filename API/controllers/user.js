const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Blog = require('../models/blog');
const config = require('../util/config');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.sendgrid_key
    }
}));

exports.getUser = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    user.getBlogs()
                        .then(blogs => {
                            res.json({
                                user: user,
                                blogs: blogs
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

exports.postDeleteUser = (req, res, next) => {
    let delete_user;
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const err = new Error('User not found');
                    }
                    delete_user = user;
                    return Blog.destroy({ where: { userId: user.id } })
                })
                .then(() => {
                    return delete_user.destroy();
                })
                .then(() => {
                    res.status(200).json({
                        message: 'Deleted successfully'
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                })
        });
    }
    else {
        const err = new Error('Token is not provided');
        return next(err);
    }
};

exports.postChangePassword = (req, res, next) => {
    let new_user;
    let token = req.headers['authorization'];
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    new_user = user;
                    const oldPassword = req.body.oldPassword;
                    return bcrypt.compare(oldPassword, user.password);
                })
                .then(doMatch => {
                    if (!doMatch) {
                        const error = new Error('password is incorrect');
                        return next(error);
                    }
                    if (newPassword !== confirmPassword) {
                        const err = new Error('passwords do not match');
                        return next(err);
                    }
                    return bcrypt.hash(newPassword, 12);
                })
                .then(hashedPassword => {
                    new_user.password = hashedPassword;
                    return new_user.save();
                })
                .then(() => {
                    res.status(200).json({
                        message: "password changed"
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('token is not provided');
        return next(err);
    }
};

exports.postChangeName = (req, res, next) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const err = new Error('user not found');
                    }
                    user.fname = fname;
                    user.lname = lname;
                    return user.save();
                })
                .then(() => {
                    res.json({
                        message: "Name changed successfully"
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        })
    }
    else {
        const err = new Error('Token is not provided');
        return next(err);
    }
}

exports.postChangeUsername = (req, res, next) => {
    const new_username = req.body.username;
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const err = new Error('user not found');
                        return next(err);
                    }
                    user.username = new_username;
                    user.save()
                        .then(() => {
                            res.json({
                                message: 'username changed successfully'
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
    }
    else {
        const err = new Error('Token not provided');
        return next(err);
    }
}