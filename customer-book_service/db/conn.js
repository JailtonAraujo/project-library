const {Sequelize} = require('sequelize');


const db_name=process.env.DB_NAME;
const username=process.env.USER_DB;
const password=process.env.PASSWORD;
const db_host=process.env.HOST;
const db_port = process.env.PORT_DB;


const sequelize = new Sequelize({
    database:db_name,
    username:username,
    password:password,
    host:db_host,
    port:db_port,
    dialect:'mysql',
    define:{
        createdAt:false,
        timestamps:false,
        updatedAt:false
    }
});

module.exports=sequelize;