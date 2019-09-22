const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../util/config');

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

exports.getEditUser = (req, res, next) => {};

exports.postEditUser = (req, res, next) => {};

exports.postDeleteUser = (req, res, next) => {};