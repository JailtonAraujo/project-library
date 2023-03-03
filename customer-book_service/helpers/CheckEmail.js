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



      const checkEmail = async (emailToTest) =>{

        await transport.sendMail({
            from:user, // sender address
            to:emailToTest, // list of receivers
            subject: "Validação de email.", // Subject line
            text: "Email de verifição. Não responda esse email!", // plain text body,
          })

      }

      module.exports = {checkEmail}
