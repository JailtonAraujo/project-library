const {checkIfEmailExists} = require('../models/Customer');

const CustomerDataValid = async (req, res, next) =>{

    const {id, name, email} = req.body;

    if(!name){
        res.status(422).json({message:"Name is required!"});
        return;
    }else if(!email){
        res.status(422).json({message:"E-mail is required!"});
        return;
    }else if (!validateEmail(email)) {
        res.status(422).json({message:"E-mail is not valid!"});
        return;
    }

    const result = await checkIfEmailExists(email);   
    if (result.result && !id){
        res.status(422).json({message:"E-mail already exists!"});
        return;
    }

    next();

    
}


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

module.exports = {CustomerDataValid}