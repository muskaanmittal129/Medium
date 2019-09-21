const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const User = require('./models/user');
const Blog = require('./models/blog');

const loginRoutes = require('./routes/login');
const blogRoutes = require('./routes/blogs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/*app.use((req, res, next) => {
    if (!req.user) {
        return next();
    }
    User.findByPk(req.user.id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});*/

app.use(loginRoutes);
app.use('/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message
    });
})

User.hasMany(Blog);

sequelize
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(8080);
    })
    .catch(err => console.log(err));