const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const unit_kerja = sequelize.define('unit_kerja', {
    id_unit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = unit_kerja;
