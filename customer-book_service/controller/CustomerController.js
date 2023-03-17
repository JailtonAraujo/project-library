const { Op } = require('sequelize');
const {Customer, checkIfEmailExistsByid} = require('../models/Customer');


const register = async (req,res) =>{

    const {name, email} = req.body;

    const customer = await Customer.create({
        name,
        email
    });

    res.status(200).json(customer);

}

const findAllCustomer = async (req, res) =>{

    const customers = await Customer.findAll();

    res.status(201).json(customers)

}

const deleteCustomer = async (req,res) =>{

    const id = req.params.id;

    await Customer.destroy({where:{id:id}});

    res.status(200).json({message:'custumer been deleted!',id:id});

}

const findByName = async (req, res) =>{

    const nameSearch = req.query.name;

    const customers = await Customer.findAll({where:{name:{[Op.like]:`${nameSearch}%`}}});

    res.status(200).json(customers);

}

const findById = async (req, res) =>{

    const id = req.params.id;

    console.log(id)

    const customer = await Customer.findOne({where:{id:id}});

    res.status(200).json(customer);

}

const update = async (req, res) =>{

    const {id, name, email} = req.body;

    //check if email already exists
    const result = await checkIfEmailExistsByid(email,id);

    if(result.result){
        res.status(201).json({message:'E-mail already exists!'});
        return;
    }

     await Customer.update({
        name,
        email
    },{where:{id:id}});
	
	const customer = await Customer.findOne({where:{id:id}});

    res.status(201).json({message:'Customer been update',customer});

}



const CustomerController = {
    register,
    findAllCustomer,
    deleteCustomer,
    findByName,
    update,
	findById
}

module.exports = CustomerController;