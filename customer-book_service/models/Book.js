const db = require("../db/conn");

const { DataTypes } = require('sequelize');

const Book = db.define('tbl_book',{
    
    name:{
        type:DataTypes.STRING,
        require:true,
        
    },
    gender:{
        type:DataTypes.STRING,
        require:true
    },
    quantity:{
        type:DataTypes.NUMBER,
        require:true
    },
});

const bookExists = async (id) =>{

    const sql = `SELECT CASE WHEN count(1) > 0 THEN TRUE ELSE FALSE END  AS result FROM tbl_books b WHERE b.id = ${id};`;

    const result = await db.query(sql,{plain:true});

    return result;

}

module.exports = {Book, bookExists};