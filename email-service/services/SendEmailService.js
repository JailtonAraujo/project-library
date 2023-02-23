const { findById } = require('../repository/OrderRepository');
const { sendMail } = require('./EmailService');


const sendMailCheckIn = async (orderId) =>{
    
    const order = await findById(1);

    await sendMail({to:"",html:buildBodyMail(order)});
    
}



const buildBodyMail = (order) =>{

    const bodyEmail = `
    <html>
    <body>
        <main >
            <h1 style="color: green; margin-bottom: 0.6em;">Pedido de alocação confimado!</h1>
            <div>
                <h2 style="padding-bottom: 0.4em;">Olá ${order.customer_name}, segue abaixo as informações do seu pedido:</h2>
                <p>Nome do livro: <span style="font-weight: bold; font-size: 1.2em;"> ${order.book_name} </span> </p>
                <p>Gênereno: <span style="font-weight: bold; font-size: 1.2em;"> ${order.gender} </span> </p>
                <p>Data do pedido: <span style="font-weight: bold; font-size: 1.2em;"> ${Date.now()} </span> </p>
                <p>Data da devolução: <span style="font-weight: bold; font-size: 1.2em;"> ${Date.now()} </span> </p>
                <p>valor: <span style="font-weight: bold; font-size: 1.2em;"> R$10,20 </span> </p>
                <p>Carência maxima de dias: <span style="font-weight: bold; font-size: 1.2em;" > 2 dias</span> </p>
            </div>
        </main>
    </body>
    </html>
`;

return bodyEmail;

}




const SendEmails = {
    sendMailCheckIn
}

module.exports = SendEmails;