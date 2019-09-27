const express = require('express');
const { check } = require('express-validator/check');

const blogController = require('../controllers/blogs.js');

const router = express.Router();

router.post(
    '/blog/create',
    [
        check('content')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter some content');
                }
                return true;
            }),
        check('title')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter a title');
                }
                return true;
            }),
        check('imagePath')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please enter the path for an image');
                }
                return true;
            }),
        check('category')
            .custom(value => {
                if (value === "") {
                    throw new Error('Please select a category');
                }
                if (value !== 'Technology' && value !== 'Creativity' && value !== 'Current Affairs' && value !== 'Health') {
                    throw new Error("Invalid Category");
                }
                return true;
            }),
    ],
    blogController.postAddBlog
);

router.get('/home', blogController.getAllBlogs);
router.get('/blog/:blogId', blogController.getBlog);
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
                if (value !== 'Technology' && value !== 'Creativity' && value !== 'Current Affairs' && value !== 'Health') {
                    throw new Error("Invalid Category");
                }
                return true;
            })
    ],
    blogController.postEditBlog
);
router.post('/blog/delete/:blogId', blogController.postDeleteBlog);
router.post('/blog/clap/:blogId', blogController.postClap);
router.post('/blog/add-bookmark/:blogId', blogController.postAddBookmark);

module.exports = router;