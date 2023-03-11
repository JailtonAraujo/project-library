const { Op } = require('sequelize');
const {Book,bookExists} = require('../models/Book');

const saveBook = async (req, res) => {

    const { name, gender, quantity } = req.body;
    const image = req.file.filename;

    // if(!name){
    //     res.status(422).json({message:"Name is required!"});
    //     return;
    // }else if (!gender){
    //     res.status(422).json({message:"Gender is required!"});
    //     return;
    // }else if (!quantity || quantity === 0){
    //     res.status(422).json({message:"quantity must be more that 0!"});
    //     return;
    // }

    const book = await Book.create({
       name,
       gender,
       quantity,
       image
    });

    res.status(201).json({});

}

const findAllBooks = async (req,res) =>{

    const books = await Book.findAll();

    res.status(200).json(books);

}

const deleteBook = async (req,res) =>{

    const id = req.params.id;

    await Book.destroy({where:{id:id}});

    res.status(200).json({message:'deleted'})

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

    const {name,gender,quantity, id} = req.body;

    const exists = await bookExists(id);
    
    if(!exists.result){
        res.status(404).json({message:"BOOK NOT FOUND!"});
        return;
    }
   
    await Book.update({name,gender,quantity},{where:{id:id}});

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