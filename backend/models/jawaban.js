const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const jawaban = sequelize.define('jawaban', {
    id_jawaban: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pertanyaan: {
        type: DataTypes.INTEGER,
        references: {
            model: 'pertanyaans',
            key: 'id_pertanyaan'
        }
    },
    id_coresponden: {
        type: DataTypes.INTEGER,
        references: {
            model: 'corespondens',
            key: 'id_coresponden'
        }
    },
    jawaban: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = jawaban;
