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

    console.log(user);
    console.log(pass);
    console.log(emailAddressServer);
    console.log(emailServerPort);

    await transport.sendMail({
        from:user,
        to:"jailtoncapoeira2017@gmail.com",
        replyTo:user,
        subject:"Email de confirmação!",
        html:html
    }).then(res=>{
        console.log(`email sended to ${to};`);
    }).catch(err=>{
        console.log(err)
    })

}

module.exports = {sendMail};