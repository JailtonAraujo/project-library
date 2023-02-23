const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;

const conn = require('./db/conn');

//listeners
const listenerCheckIn = require('./listeners/checkInListener');

app.get("/",(req,res)=>{
    res.status(200).json({message:`API IS RUNNING...`});
})

conn.connect((err)=>{

    if(err){
        console.log(err)
    }

    app.listen(port,()=>{
        console.log(`API running port ${port}!`);
        console.log(`Connected to DB!`);
        // listenerCheckIn().catch(e => console.error(`[example/consumer] ${e.message}`, e))
    })

})
