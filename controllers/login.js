exports.getLogin = (req, res, next) => {
    res.status(200).json({
        users: [{ username: 'nimish', password: 'wasd' }]
    });
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    //Authenticate here
    res.status(200).json({
        message: 'Login Successful',
        user: username,
        password: password,
        date: new Date().toDateString(),
        time: new Date().toTimeString()
    })
};