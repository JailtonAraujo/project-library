const db = require('../db/conn');
const { DataTypes } = require('sequelize');

const Customer = db.define('tbl_customers',{

    name:{
        type:DataTypes.STRING,
        require:true
    },
    email:{
        type:DataTypes.STRING,
        require:true
    }

});

const checkIfEmailExists = async (email) =>{
    const sql = `SELECT CASE WHEN count(1) > 0 THEN TRUE ELSE FALSE END AS result FROM tbl_customers WHERE email = '${email}';`;

    const result = await db.query(sql,{plain:true});
    
    return result;
}

const checkIfEmailExistsByid = async (email,id) =>{
    const sql = `SELECT CASE WHEN count(1) > 0 THEN TRUE ELSE FALSE END AS result FROM tbl_customers WHERE email = '${email}' AND id != ${id};`;

    const result = await db.query(sql,{plain:true});
    
    return result;
}

module.exports = {Customer, checkIfEmailExists, checkIfEmailExistsByid};