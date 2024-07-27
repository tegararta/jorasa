const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const pertanyaan = sequelize.define('pertanyaan', {
    id_pertanyaan: {
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
    pertanyaan: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pilihan_a: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pilihan_b: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pilihan_c: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    pilihan_d: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = pertanyaan;
