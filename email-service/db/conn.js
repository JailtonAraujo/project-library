const mysql = require('mysql');

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;



const conn = mysql.createConnection({
    host: dbHost,
    user: dbUsername,
    password: dbPassword,
    database: dbName,
});

module.exports = conn;
