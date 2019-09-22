const express = require('express');
const { check } = require('express-validator/check');

const blogController = require('../controllers/blogs.js');

const router = express.Router();

router.post(
    '/blog/create',
    [
        check('imagePath')
            .custom(value => {
                if (value == '') {
                    throw new Error("Title can't be empty");
                }
                return true;
            }),
        check('title')
            .custom(value => {
                if (value == '') {
                    throw new Error("Title can't be empty");
                }
                return true;
            }),
        check('content')
            .custom(value => {
                if (value == '') {
                    throw new Error("Title can't be empty");
                }
                return true;
            }),
        check('category')
            .custom(value => {
                if (value == '') {
                    throw new Error("Title can't be empty");
                }
                return true;
            }),
    ],
    blogController.postAddBlog
);

router.get('/home', blogController.getAllBlogs);
router.post('/blog/delete/:blogId');
router.post('/blog/edit/:blogId');

module.exports = router;