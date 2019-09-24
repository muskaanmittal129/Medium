const express = require('express');
const { check } = require('express-validator/check');

const blogController = require('../controllers/blogs.js');

const router = express.Router();

router.post(
    '/blog/create',
    [
        check('content')
            .isEmpty()
            .withMessage('Please enter some content'),
        check('title')
            .isEmpty()
            .withMessage('Please enter a title'),
        check('imagePath')
            .isEmpty()
            .withMessage('Please enter an image path'),
        check('category')
            .isEmpty()
            .withMessage('Please select a category'),
    ],
    blogController.postAddBlog
);

router.get('/home', blogController.getAllBlogs);
router.get('/blog/edit/:blogId', blogController.getEditBlog);
router.post(
    '/blog/edit/:blogId',
    [
        check('imagePath')
            .custom(value => {
                if (value == '') {
                    throw new Error("Image path can't be empty");
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
                    throw new Error("Content can't be empty");
                }
                return true;
            }),
        check('category')
            .custom(value => {
                if (value == '') {
                    throw new Error("Category can't be empty");
                }
                return true;
            })
    ],
    blogController.postEditBlog
);
router.post('/blog/delete/:blogId', blogController.postDeleteBlog);

module.exports = router;