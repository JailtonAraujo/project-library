const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

const connect = require('./db/conn');

//listeners
const listenerCheckIn = require('./listeners/checkInListener');

//Test API state
app.get("/", async (req,res)=>{
    res.status(200).json({message:`API IS RUNNING...`});
})

        
app.listen(port,()=>{
    console.log(`API running port ${port}!`);
    listenerCheckIn().catch(e => console.error(`[example/consumer] ${e.message}`, e))
})



