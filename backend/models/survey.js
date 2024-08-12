const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const survey = sequelize.define('survey', {
    id_survey: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    judul: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
});
User.hasMany(survey, { foreignKey: 'id_user' });
survey.belongsTo(User, { foreignKey: 'id_user' });


module.exports = survey;
