

const bookDateValid = async (req,res,next) => {

    const { name, gender, quantity } = req.body;

    if(!name){
        res.status(422).json({message:"Name is required!"});
        return;
    }else if (!gender){
        res.status(422).json({message:"Gender is required!"});
        return;
    }else if (!quantity || quantity === 0){
        res.status(422).json({message:"quantity must be more that 0!"});
        return;
    }

     next();   

}

module.exports = {bookDateValid}