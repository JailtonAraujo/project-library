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

const sendMail = async ({to,subject,text,html}) =>{

    console.log(user);
    console.log(pass);
    console.log(emailAddressServer);
    console.log(emailServerPort);

    await transport.sendMail({
        from:user,
        to:"jailtoncapoeira2017@gmail.com",
        replyTo:user,
        subject:"test nodemail",
        text:"Send email from nodemail",
        html:"<p>Testando...</p>"
    }).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err)
    })

}

module.exports = sendMail;