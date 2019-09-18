const Sequelize = require('sequelize');

const sequelize = new Sequelize('medium', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;