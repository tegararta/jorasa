const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Unit = require('./unit_kerja');

const user = sequelize.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_unit: {
        type: DataTypes.INTEGER,
        references: {
            model: Unit,
            key: 'id_unit'
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

Unit.hasMany(user, { foreignKey: 'id_unit' });
user.belongsTo(Unit, { foreignKey: 'id_unit' });

module.exports = user;
