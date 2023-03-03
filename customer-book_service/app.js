const express = require('express');
require('dotenv').config();
const app = express();

const api_port = process.env.PORT;

const conn = require('./db/conn');

app.use(express.json())
app.use(express.urlencoded({extended:false}));

//routes
const router = require('./routes/routes');
app.use(router);


conn.authenticate().then(()=>{

    app.listen(api_port,()=>{
        console.log(`API RUNNING IN PORT ${api_port}`);
        console.log(`CONNECTED IN DB`);
    })

}).catch((err)=>{
    console.log(err)
})

