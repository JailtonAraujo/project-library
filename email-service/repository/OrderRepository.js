const connect = require('../db/conn');

const findById = async (id)=>{

    const conn = await connect();

    const sql = `
    SELECT tbl_book.id as book_id, tbl_book.gender, tbl_book.name as book_name, tbl_book.quantity,
    tbl_customer.id as customer_id, tbl_customer.name as customer_name
    FROM tbl_order
    INNER JOIN tbl_book ON tbl_book.id = tbl_order.book_id
    INNER JOIN tbl_customer ON tbl_customer.id = tbl_order.customer_id
    WHERE tbl_order.id = ${id};`;

    const [rows] = await conn.query(sql);
    return rows[0];

}


const OrderRepository = {
    findById
}

module.exports = OrderRepository;