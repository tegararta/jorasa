const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const layanan = sequelize.define('layanan', {
    id_layanan: {
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
    nama_layanan: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_unit: {
        type: DataTypes.INTEGER,
        references: {
            model: 'unit_kerjas',
            key: 'id_unit'
        }
    },
});

module.exports = layanan;
