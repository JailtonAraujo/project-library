const  { body } = require('express-validator')

const bookDateValid = () => {

    return [

        body("name")
        .isString().withMessage("Name is required.")
        .isLength({min:3})
            .withMessage("O nome precisa ter no menino 3 caracteres!"),

        body("gender")
        .isString().withMessage("gender is required."),

        body("quantity")
        .isNumeric().withMessage('Quantity is required')
        .custom((value,{req})=>{
            if(req.body.quantity === 0 ){
                throw new Error("Quantity must be more that 0!");
            }
            return true
        }),

        body("image")
        .custom((value,{req})=>{
            if(!req.file){
                throw new Error("A imagem é obrigatoria!");
            }
            return true;
        })

    ];

    

}

module.exports = {bookDateValid}