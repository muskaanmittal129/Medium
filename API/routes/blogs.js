const express = require('express');

const blogController = require('../controllers/blogs.js');

const router = express.Router();

router.post('/create', blogController.postAddBlog);

module.exports = router;