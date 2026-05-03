const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your DB connection file


const Users = sequelize.define('users', {
    // Primary Key (Optional: Sequelize adds 'id' by default)
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true } // Ensures data is a valid email
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options
    timestamps: true,      // Automatically adds 'createdAt' and 'updatedAt'
    freezeTableName: true, // Prevents Sequelize from pluralizing table name to 'Users'
    tableName: 'users'      // Explicitly sets the MySQL table name
});

module.exports = Users;
