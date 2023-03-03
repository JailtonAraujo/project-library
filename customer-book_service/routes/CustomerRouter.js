const router = require('express').Router();

const {
    register,
    findAllCustomer,
    deleteCustomer,
    findByName,
    update
} = require('../controller/CustomerController');

const {
    CustomerDataValid
} = require('../middlewares/CustomerValidator');

router.post('/',CustomerDataValid,register);
router.get('/',findAllCustomer);
router.patch('/update',CustomerDataValid,update);
router.delete('/:id',deleteCustomer);
router.get('/search/name',findByName);

module.exports=router
