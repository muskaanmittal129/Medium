const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.postSignin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User
        .findOne({ where: { username: username } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'incorrect username or password'
                });
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        return res.status(401).json({
                            message: 'incorrect username or password'
                        });
                    }
                    res.status(200).json({
                        message: 'signin successful'
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword) {
        return res.status(409).json({
            message: 'passwords do not match'
        });
    }
    User
        .findOne({ where: { email: email } })
        .then(user => {
            if (user) {
                res.status(409).json({
                    message: 'email already exists'
                });
            }
        })
        .catch(err => console.log(err));
    User
        .findOne({ where: { username: username } })
        .then(user => {
            if (user) {
                res.status(409).json({
                    message: 'username already exists'
                });
            }
        })
        .catch(err => console.log(err));
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            User
                .create({
                    username: username,
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    password: hashedPassword
                })
                .then(() => {
                    res.status(200).json({
                        message: 'signup successful'
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};