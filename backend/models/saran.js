const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const saran = sequelize.define('saran', {
    id_saran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_coresponden: {
        type: DataTypes.INTEGER,
        references: {
            model: 'corespondens',
            key: 'id_coresponden'
        }
    },
    saran: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = saran;
