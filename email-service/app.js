const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

const connect = require('./db/conn');

const { sendMailCheckIn } = require('./services/SendEmailService');

//listeners
const listenerCheckIn = require('./listeners/checkInListener');

app.get("/", async (req,res)=>{
    res.status(200).json({message:`API IS RUNNING...`});
})

app.get("/send", async (req,res)=>{

    sendMailCheckIn(1);

    res.status(200).json({message:`sended`});
})

        
app.listen(port,()=>{
    console.log(`API running port ${port}!`);
    // listenerCheckIn().catch(e => console.error(`[example/consumer] ${e.message}`, e))
})



