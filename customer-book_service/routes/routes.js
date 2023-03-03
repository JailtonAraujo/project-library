const express = require('express');
const router = express();

router.use("/api/book",require('./BookRouter'));
router.use("/api/customer",require('./CustomerRouter'));

router.get('/api/status',(req,res)=>{
    res.status(200).json({message:"API IS RUNNING..."});
})

module.exports = router;