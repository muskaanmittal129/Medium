const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator/check');

const Blog = require('../models/blog');
const Bookmark = require('../models/bookmark');
const User = require('../models/user');
const config = require('../util/config');

exports.postAddBlog = (req, res, next) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const imagePath = req.body.imagePath;
    const content = req.body.content;
    const category = req.body.category;
    const errors = validationResult(req);
    const words = count(content);
    const time = Math.ceil(words / 200);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        const err = new Error(errors.array()[0].msg);
        return next(err);
    }
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
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
                        date: date,
                        time: time
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error(errors.array()[0].msg);
        return next(err);
    }
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
                    const words = count(content);
                    const time = Math.ceil(words / 200);
                    blog.title = title;
                    blog.subTitle = subTitle;
                    blog.imagePath = imagePath;
                    blog.content = content;
                    blog.category = category;
                    blog.time = time;
                    blog.save()
                        .then(() => {
                            res.status(200).json({
                                message: 'Updated successfully'
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

exports.postDeleteBlog = (req, res, next) => {
    const blogId = req.params.blogId;
    let userId;
    let token = req.headers['authorization'];
    console.log(token);
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

exports.postClap = (req, res, next) => {
    const blogId = req.params.blogId;
    let token = req.headers['authorization'];
    if (token) {
        token = token.slice(7, token.length);
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error(err);
                return next(error);
            }
            Blog.findOne({ where: { id: blogId } })
                .then(blog => {
                    if (!blog) {
                        const err = new Error('Blog not found');
                        return next(err);
                    }
                    blog.claps = blog.claps + 1;
                    blog.save()
                        .then(() => {
                            res.json({
                                message: "Clap registered"
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
        const err = new Error('Token not provided');
        return next(err);
    }
};

exports.postAddBookmark = (req, res, next) => {
    let token = req.headers['authorization'];
    const blogId = req.params.blogId;
    let current_user, current_blog;
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
                    current_user = user;
                    return Blog.findByPk(blogId);
                })
                .then(blog => {
                    current_blog = blog;
                    return Bookmark.findOne({ where: { userId: current_user.id, blogId: current_blog.id } });
                })
                .then(bookmark => {
                    if (bookmark) {
                        bookmark.destroy({ where: { userId: current_user.id, blogId: current_blog.id } })
                            .then(() => {
                                res.json({
                                    message: 'bookmark removed'
                                });
                            })
                            .catch(err => {
                                const error = new Error(err);
                                return next(error);
                            });
                    }
                    else {
                        current_blog.addUser(current_user);
                        res.json({
                            message: 'bookmark added'
                        });
                    }
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

function count(s) {
    s = s.trim();
    s = s.replace(/[ ]{2,}/gi, " ");                    //i => case insensitive, g=> global scope
    s = s.replace(/\n /, "\n");                         //replaces new lines with a space
    return s.split(' ').filter(String).length + 1;
}