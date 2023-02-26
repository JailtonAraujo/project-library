const { findById } = require('../repository/OrderRepository');
const { sendMail } = require('./EmailService');
const { formatDate } = require('../helpers/converteDateFormat');

const sendMailCheckIn = async (checkInId) =>{
    
    const checkIn = await findById(checkInId);

    if(checkIn === null){
        console.log(`CheckIn with id: ${checkInId} not found;`);
        return;
    }

    try {
        await sendMail({to:checkIn.customer_email,html:buildBodyMail(checkIn)});   
    } catch (error) {
        console.log(`Erro send email to :${checkIn.customer_email} -> ${error}`);
    }
    
}



const buildBodyMail = (checkIn) =>{

    const bodyEmail = `
    <html>
    <body>
        <main >
            <h1 style="color: green; margin-bottom: 0.6em;">Pedido de emprestimo confimado!</h1>
            <div>
                <h2 style="padding-bottom: 0.4em;">Olá ${checkIn.customer_name}, segue abaixo as informações do seu pedido:</h2>
                <p>Nome do livro: <span style="font-weight: bold; font-size: 1.2em;"> ${checkIn.book_name} </span> </p>
                <p>Gênereno: <span style="font-weight: bold; font-size: 1.2em;"> ${checkIn.gender} </span> </p>
                <p>Data do pedido: <span style="font-weight: bold; font-size: 1.2em;"> ${formatDate(checkIn.checkin_date)} </span> </p>
                <p>Data da devolução: <span style="font-weight: bold; font-size: 1.2em;"> ${formatDate(checkIn.checkout_date)} </span> </p>
                <p>valor: <span style="font-weight: bold; font-size: 1.2em;"> R$${checkIn.valor.toFixed(2)} </span> </p>
                <p>Carência maxima de dias: <span style="font-weight: bold; font-size: 1.2em;" > 2 dias</span> </p>
                <p style="padding-top:0.7em;"> 
                    <span style="color:red; font-weight: bold; font-size: 1.2em;">Atenção,</span> 
                    para cada dia de atraso será cobrado uma taxa de <span style="color:red; font-weight: bold; font-size: 1.2em;">R$1.50</span>
                </p>
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