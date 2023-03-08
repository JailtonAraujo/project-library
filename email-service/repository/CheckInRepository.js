const connect = require('../db/conn');

const findById = async (id)=>{

    const conn = await connect();

    const sql = `
    SELECT tbl_checkin.checkin_date, tbl_checkin.checkout_date, tbl_checkin.valor,
    tbl_books.id as book_id, tbl_books.gender, tbl_books.name as book_name, tbl_books.quantity,
    tbl_customers.id as customer_id, tbl_customers.name as customer_name, tbl_customers.email as customer_email
    FROM tbl_checkin
    INNER JOIN tbl_books ON tbl_books.id = tbl_checkin.book_id
    INNER JOIN tbl_customers ON tbl_customers.id = tbl_checkin.customer_id
    WHERE tbl_checkin.id = ${id};`;

    const [rows] = await conn.query(sql);

    if(rows.length === 0 ){
        return null
    }

    return rows[0];

}


// const CheckInRepository = {
//     findById
// }

module.exports = {findById};