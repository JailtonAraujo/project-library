const fs = require('fs');

const path ="./uploads/books/";

const deleteImage = async (name) =>{

    try {
        fs.unlink(`${path}/${name}`, function (err){
            if (err) throw err;
        })
    } catch (error) {
        console.log(error);
    }

};


module.exports = {deleteImage};