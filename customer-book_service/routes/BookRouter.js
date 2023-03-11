const router = require('express').Router();

const { imageUpload } = require('../middlewares/imgUpload');

const { 
    saveBook,
    findAllBooks,
    deleteBook,
    findById,
    findByName,
    findByGender,
    updateBook
} = require('../controller/BookController');

const { bookDateValid } = require('../middlewares/BookValidator');

const validate = require('../middlewares/handlerValidator');

router.post('/',imageUpload.single('image'),saveBook);
router.get('/', findAllBooks);
router.get('/find/name',findByName);
router.get('/find/gender',findByGender);
router.patch('/update',imageUpload.single('image'),updateBook);
router.delete('/:id',deleteBook);
router.get('/:id',findById);



module.exports = router;