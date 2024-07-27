const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const survey = sequelize.define('survey', {
    id_survey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id_user'
        }
    },
});

module.exports = survey;
