const multer = require('multer');
const path = require('path');

//Destination to store image
const imageStorage = multer.diskStorage({
    destination:'uploads/books',
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const imageUpload = multer({
    storage:imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){

            //upload only png and jpg formats
            return cb(new Error("Por favor envie apenas PNG ou JPG!"))
        }
        cb(undefined,true);
    }
});

module.exports = {imageUpload};
