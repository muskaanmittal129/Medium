const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Bookmark = sequelize.define('bookmark', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Bookmark;