const { Op } = require('sequelize');
const {Book, bookExists, getImage} = require('../models/Book');

const { deleteImage } = require('../helpers/handleImage');

const saveBook = async (req, res) => {

    const { name, gender, quantity } = req.body;
	

     if(!name){
         res.status(422).json({message:"Name is required!",error:true});
         return;
     }else if (!gender){
         res.status(422).json({message:"Gender is required!",error:true});
         return;
     }else if (!quantity || quantity === 0){
         res.status(422).json({message:"quantity must be more that 0!",error:true});
         return;
     }else if(!req.file){
		res.status(422).json({message:"Image is required!",error:true});
        return;	
	}
	 
	  const image = req.file.filename;

    const book = await Book.create({
       name,
       gender,
       quantity,
       image
    });

    res.status(201).json(book);

}

const findAllBooks = async (req,res) =>{

    const books = await Book.findAll();

    res.status(200).json(books);

}

const deleteBook = async (req,res) =>{

    const id = req.params.id;
	
	const image = await getImage(id);

    await Book.destroy({where:{id:id}});

    deleteImage(image.image);

    res.status(200).json({message:'deleted',id});

}

const findById = async (req,res) =>{

    const id = req.params.id;

    const book = await Book.findOne({where:{id:id}});

    if(!book){
        res.status(404).json({message:"Book not found with id "+id});
        return;
    }

    res.status(200).json(book);

}

const findByName = async (req,res) =>{

    const name = req.query.name;

    console.log(name)

    if(!name){
        res.status(404).json({message:"name is required for search"});
        return;
    }

    const book = await Book.findAll({where:{name:{[Op.like]:`${name}%`}}});

    res.status(422).json(book);

}

const findByGender = async (req,res) =>{

    const gender = req.query.gender;

    if(!gender){
        res.status(422).json({message:"gender is required for search!"});
        return;
    }

    const books = await Book.findAll({where:{gender:gender}});

    res.status(200).json(books);
}


const updateBook = async (req,res) =>{

    const {name,gender,quantity, id, image} = req.body;

    const exists = await bookExists(id);
    
    if(!exists.result){
        res.status(404).json({message:"BOOK NOT FOUND!"});
        return;
    }

    if(!name){
        res.status(422).json({message:"Name is required!",error:true});
        return;
    }else if (!gender){
        res.status(422).json({message:"Gender is required!",error:true});
        return;
    }else if (!quantity || quantity === 0){
        res.status(422).json({message:"quantity must be more that 0!",error:true});
        return;
    }
    
    let newImage ='';
    //get old image
    const oldImage = await getImage(id);

    //if user not send a new image, not change current image
    if(!req.file){
        newImage = oldImage.image;
    }else {
        newImage = req.file.filename;
    }

    console.log(newImage);
   
    await Book.update({name,gender,quantity,image:newImage},{where:{id:id}});

    //delete old image if was send a new image 
   if(oldImage.image.toString() !== newImage.toString()){
        deleteImage(oldImage.image);
   }

    res.status(200).json({message:"book been update!"});

}


const BookController = {
    saveBook,
    findAllBooks,
    deleteBook,
    findById,
    findByName,
    findByGender,
    updateBook
}

module.exports = BookController;