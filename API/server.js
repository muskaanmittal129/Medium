const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const User = require('./models/user');
const Blog = require('./models/blog');
const Bookmark = require('./models/bookmark');
const Token = require('./models/token');

const loginRoutes = require('./routes/login');
const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(loginRoutes);
app.use(blogRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message
    });
});

User.hasMany(Blog);
User.hasMany(Token);
Token.belongsTo(User);
Blog.belongsToMany(User, { through: Bookmark });

sequelize
    .sync()
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));