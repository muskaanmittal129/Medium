const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Token = sequelize.define('token', {
    token: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Token;