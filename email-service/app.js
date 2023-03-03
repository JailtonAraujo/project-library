const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

const connect = require('./db/conn');

//listeners
const listenerCheckIn = require('./listeners/checkInListener');
const listenerCheckOut = require('./listeners/checkOutListener');

//services
const { sendMailCheckOut,sendMailCheckIn } = require('./services/SendEmailService');

//Test API state
app.get("/", async (req,res)=>{
    res.status(200).json({message:`API IS RUNNING...`});
})


app.get("/send", async (req,res)=>{
    
    await sendMailCheckOut(2)
    res.status(200).json({message:`SEND...`});
})

        
app.listen(port,()=>{
    console.log(`API running port ${port}!`);
    //listenerCheckIn().catch(e => console.error(`[checkin/consumer] ${e.message}`, e))
    // listenerCheckOut().catch(e => console.error(`[checkout/consumer] ${e.message}`, e));
})



