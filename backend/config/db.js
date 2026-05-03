require('dotenv').config();
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10
// });

// module.exports = pool;
// const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Tells Sequelize to use mysql2 automatically
  logging: false    // Optional: set to true to see SQL in your console
});

module.exports = sequelize;
