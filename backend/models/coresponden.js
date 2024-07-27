const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const coresponden = sequelize.define('coresponden', {
    id_coresponden: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_survey: {
        type: DataTypes.INTEGER,
        references: {
            model: 'surveys',
            key: 'id_survey'
        }
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    layanan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_layanan: {
        type: DataTypes.INTEGER,
        references: {
            model: 'layanans',
            key: 'id_layanan'
        }
    },
});

module.exports = coresponden;
