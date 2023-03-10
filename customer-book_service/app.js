const express = require('express');
require('dotenv').config();
const app = express();

const path = require('path');

const cors = require('cors');

const api_port = process.env.PORT;

const conn = require('./db/conn');

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(cors({credentials:true, origin:"http://localhost:3000"}));

//routes
const router = require('./routes/routes');
app.use(router);
app.use("/uploads",express.static(path.join(__dirname,"/uploads")));

conn.authenticate().then(()=>{

    app.listen(api_port,()=>{
        console.log(`API RUNNING IN PORT ${api_port}`);
        console.log(`CONNECTED IN DB`);
    })

}).catch((err)=>{
    console.log(err)
})

