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
                if(value !== 'Technology' && value !== 'Creativity' && value !== 'Health' && value !== 'Current Affairs'){
                    throw new Error("Invalid category")
                }
                return true;
            }),
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
                if(value !== 'Technology' && value !== 'Creativity' && value !== 'Health' && value !== 'Current Affairs'){
                    throw new Error("Invalid category")
                }
                return true;
            }),
    ],
    blogController.postEditBlog
);
router.post('/blog/delete/:blogId', blogController.postDeleteBlog);

module.exports = router;