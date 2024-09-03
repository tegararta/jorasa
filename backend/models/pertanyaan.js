const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const pertanyaan = sequelize.define('pertanyaan', {
    id_pertanyaan: {
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
    id_survey: {
        type: DataTypes.INTEGER,
        references: {
            model: 'surveys',
            key: 'id_survey'
        }
    },
    pertanyaan: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = pertanyaan;
