const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../util/config');

exports.postAddBlog = (req, res, next) => {
    const title = req.body.title;
    const subTitle = req.body.subTitle;
    const imageURL = req.body.imagePath;
    const content = req.body.content;
    const category = req.body.category;
    console.log(title, subTitle, content, category, imageURL);
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    if (token) {
        jwt.verify(token, config.tokenSecret, (err, decoded) => {
            if (err) {
                const error = new Error('Token is not valid');
                return next(error);
            }
            console.log(decoded);
            User.findOne({ where: { username: decoded.username } })
                .then(user => {
                    if (!user) {
                        const error = new Error('The token provided is invalid');
                        return next(error);
                    }
                    const blog = new Blog({
                        title: title,
                        subtitle: subTitle,
                        imageURL: imageURL,
                        content: content,
                        category: category,
                        publisher: decoded.name,
                        userId: user.id
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