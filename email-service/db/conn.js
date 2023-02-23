const mysql = require('mysql2/promise');

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const connect = async () =>{

    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }

    const conn = await mysql.createConnection({
        host:dbHost,
        port:3306,
        database:dbName,
        user:dbUsername,
        password:dbPassword
    });
    console.log("connected to db.");
    global.connection = conn;
    return conn;
    
}

connect();

module.exports=connect;

