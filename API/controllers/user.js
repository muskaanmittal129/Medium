const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const Token = require('../models/token');
const User = require('../models/user');
const Blog = require('../models/blog');
const Bookmark = require('../models/bookmark');
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
            Token.findByPk(token)
                .then(token => {
                    if (!token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findByPk(decoded.userId)
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
            Token.findByPk(token)
                .then(token => {
                    if (!token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findByPk(decoded.userId)
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    if (token) {
        token = token.slice(7, token.length);
        Token.findByPk(token)
            .then(token => {
                if (!token) {
                    const error = new Error('Invalid token');
                    return next(error);
                }
            })
            .catch(err => {
                const error = new Error(err);
                return next(error);
            });
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    new_user = user;
                    const oldPassword = req.body.oldPassword;
                    return bcrypt.compare(oldPassword, user.password);
                })
                .then(doMatch => {
                    if (!doMatch) {
                        const error = new Error('Password is incorrect');
                        return next(error);
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            Token.findByPk(token)
                .then(token => {
                    if (!token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findByPk(decoded.userId)
                .then(user => {
                    if (!user) {
                        const err = new Error('user not found');
                    }
                    user.name = fname + ' ' + lname;
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
};

exports.postChangeUsername = (req, res, next) => {
    const new_username = req.body.username;
    let token = req.headers['authorization'];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            Token.findByPk(token)
                .then(token => {
                    if (!token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findOne({ where: { username: new_username } })
                .then(user => {
                    if (user) {
                        const error = new Error('Username already exists');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findByPk(decoded.userId)
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
};

exports.postChangeEmail = (req, res, next) => {
    const new_email = req.body.email;
    let token = req.headers['authorization'];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        return next(error);
    }
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            Token.findByPk(token)
                .then(token => {
                    if (!token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findOne({ where: { email: new_email } })
                .then(user => {
                    if (user) {
                        const error = new Error('email already exists');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            User.findByPk(decoded.userId)
                .then(user => {
                    if (!user) {
                        const error = new Error('user not found');
                        return next(error);
                    }
                    const otp = Math.floor(100000 + Math.random() * 900000);
                    user.verified = false;
                    user.email = new_email;
                    user.otp = otp;
                    user.save()
                        .then(() => {
                            setTimeout(function () {
                                User.findByPk(decoded.userId)
                                    .then(user => {
                                        if (user.otp !== null) {
                                            user.otp = null;
                                            return user.save();
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
                            res.json({
                                message: 'otp sent',
                                username: user.username
                            });
                            transporter.sendMail({
                                to: new_email,
                                from: 'nimishb2000@gmail.com',
                                subject: 'OTP for verification',
                                html: `
                                    <h3>Hi ${user.username}</h3>
                                    <p>You have changed your e-mail to this e-mail address</p>
                                    <p>Please enter the OTP given below to verify your new e-mail address</p>
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
        });
    }
    else {
        const err = new Error('Token is not provided');
        return next(err);
    }
}

exports.getBookmarks = (req, res, next) => {
    let token = req.headers['authorization'];
    let x = 0;
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            Token.findByPk(token)
                .then(fetched_token => {
                    if (!fetched_token) {
                        const error = new Error('Invalid token');
                        return next(error);
                    }
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            let bookmarkedBlogs = new Array();
            User.findByPk(decoded.userId)
                .then(user => {
                    if (!user) {
                        const error = new Error('User not found');
                        return next(error);
                    }
                    return Bookmark.findAll({ where: { userId: user.id } });
                })
                .then(bookmarks => {
                    if (bookmarks.length <= 0) {
                        const error = new Error('You have no bookmarks');
                        return next(error);
                    }
                    bookmarks.forEach(bookmark => {
                        Blog.findByPk(bookmark.blogId)
                            .then(blog => {
                                bookmarkedBlogs.push(blog.dataValues);
                                x++;
                            })
                            .catch(err => {
                                const error = new Error(err);
                                return next(error);
                            });
                    });
                    const timer = setInterval(function () {
                        if (x === bookmarks.length) {
                            clearInterval(timer);
                            res.json({
                                blogs: bookmarkedBlogs
                            });
                        }
                    }, 10);
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('Token not provided');
        return next(err);
    }
};

exports.getChangeName = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token !== 'Bearer null') {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    if(!user){
                        const error = new Error('user not found');
                        return next(error);
                    }
                    const name = user.name;
                    const fname = name.split(' ')[0];
                    const lname = name.split(' ')[1];
                    res.json({
                        fname: fname,
                        lname: lname
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('Token not provided');
        return next(err);
    }
};

exports.getChangeUsername = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token !== 'Bearer null') {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    if(!user){
                        const error = new Error('user not found');
                        return next(error);
                    }
                    res.json({
                        username: user.username
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('Token not provided');
        return next(err);
    }
};

exports.getChangeEmail = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token !== 'Bearer null') {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findByPk(decoded.userId)
                .then(user => {
                    if(!user){
                        const error = new Error('user not found');
                        return next(error);
                    }
                    res.json({
                        username: user.email
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('Token not provided');
        return next(err);
    }
};