const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../util/config');

exports.postAddBlog = (req, res, next) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const imagePath = req.body.imagePath;
    const content = req.body.content;
    const category = req.body.category;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error(errors.array()[0].msg);
        return next(err);
    }
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error('Token is not valid');
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const error = new Error('No user found');
                        return next(error);
                    }
                    const date = new Date().toISOString().split('T')[0];
                    console.log(date);
                    const blog = new Blog({
                        title: title,
                        subTitle: subTitle,
                        imagePath: imagePath,
                        content: content,
                        category: category,
                        publisher: decoded.name,
                        userId: user.id,
                        date: date
                    });
                    blog.save()
                        .then(() => {
                            res.status(200).json({
                                message: 'blog created successfully'
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
        const error = new Error('Token is not provided');
        return next(error);
    }
};

exports.getAllBlogs = (req, res, next) => {
    Blog.findAll()
        .then(blogs => {
            if (!blogs) {
                const error = new Error('There are no blogs. Login to create one');
                return next(error);
            }
            res.status(200).json({
                blogs: blogs
            });
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        });
};

exports.getEditBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    let userId;
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error(errors.array()[0].msg);
        return next(err);
    }
    if (token) {
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const error = new Error('No user found');
                        return next(error);
                    }
                    userId = user.id;
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            Blog.findOne({ where: { id: blogId } })
                .then(blog => {
                    if (!blog) {
                        const err = new Error("Invalid blog ID");
                        return next(err);
                    }
                    if (userId != blog.userId) {
                        const err = new Error("You don't have permission to edit this blog");
                        return next(err);
                    }
                    res.json({
                        blog: blog
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
        });
    }
    else {
        const err = new Error('Token not supplied');
        return next(err);
    }
};

exports.postEditBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    let userId;
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const error = new Error('No user found');
                        return next(error);
                    }
                    userId = user.id;
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            Blog.findOne({ where: { id: blogId } })
                .then(blog => {
                    if (!blog) {
                        const err = new Error('Invalid blog ID');
                        return next(err);
                    }
                    console.log(userId);
                    if (userId !== blog.userId) {
                        const err = new Error("You don't have permission to edit this blog");
                        return next(err);
                    }
                    const title = req.body.title;
                    const subTitle = req.body.subTitle;
                    const imagePath = req.body.imagePath;
                    const content = req.body.content;
                    const category = req.body.category;
                    blog.title = title;
                    blog.subTitle = subTitle;
                    blog.imagePath = imagePath;
                    blog.content = content;
                    blog.category = category;
                    return blog.save();
                })
                .then(() => {
                    res.status(200).json({
                        message: 'Updated successfully'
                    });
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                })
        });
    }
    else {
        const err = new Error('Token not supplied');
        return next(err);
    }
};

exports.postDeleteBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    let userId;
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const error = new Error('No user found');
                        return next(error);
                    }
                    userId = user.id;
                })
                .catch(err => {
                    const error = new Error(err);
                    return next(error);
                });
            Blog.findOne({ where: { id: blogId } })
                .then(blog => {
                    if (!blog) {
                        const err = new Error('Invalid blog ID');
                        return next(err);
                    }
                    if (userId !== blog.userId) {
                        const err = new Error("You don't have permission to delete this blog");
                        return next(err);
                    }
                    blog.destroy()
                        .then(() => {
                            res.status(200).json({
                                message: 'Deletion successful'
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
                })
        });
    }
    else {
        const err = new Error('Token not supplied');
        return next(err);
    }
};