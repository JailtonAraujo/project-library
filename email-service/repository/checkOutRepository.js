const connect = require('../db/conn');

const findCheckOutById  = async (checkOutId)=>{

    const conn = await connect();

    const sql = `select 
    tbl_checkout.checkout_date as checkout_date, tbl_checkout.valor_pago, tbl_checkout.dias_atraso, tbl_checkout.taxa_atraso,
    tbl_customer.email as customer_email, tbl_customer.name as customer_name,
    tbl_book.name as book_name, tbl_book.gender
    from tbl_checkout
    inner join tbl_customer on tbl_customer.id = tbl_checkout.customer_id
    inner join tbl_book on tbl_book.id = tbl_checkout.book_id
    where tbl_checkout.id = ${checkOutId};`;

    const [rows] = await conn.query(sql);

    if(rows.length === 0 ){
        return null
    }

    return rows[0];

}

const CheckOutRepository = {
    findCheckOutById,
}

module.exports = CheckOutRepository;