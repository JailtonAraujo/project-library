const nodemailer = require("nodemailer");

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD;

const emailAddressServer = process.env.EMAIL_ADDRESS_SERVER;
const emailServerPort = process.env.EMAIL_PORT;


const transport = nodemailer.createTransport({
    host:emailAddressServer,
    port:emailServerPort,
    secure:true,
    auth:{
        user,
        pass
    },
});

const sendMail = async ({to,html}) =>{

    await transport.sendMail({
        from:user,
        to,
        replyTo:user,
        subject:"Email de confirmação!",
        html
    }).then(()=>{
        console.log(`email been sended to: ${to};`);
    }).catch(err=>{
        console.log(err)
    })

}

module.exports = {sendMail};