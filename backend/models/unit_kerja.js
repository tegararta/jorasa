const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UnitKerja = sequelize.define('unit_kerja', {
    id_unit: {
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
    nama_unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});


module.exports = UnitKerja;
