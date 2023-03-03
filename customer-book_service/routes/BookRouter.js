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

router.post('/',bookDateValid,imageUpload.single('image'),saveBook);
router.get('/',findAllBooks);
router.get('/find/name',findByName);
router.get('/find/gender',findByGender);
router.patch('/update',bookDateValid,updateBook);
router.delete('/:id',deleteBook);
router.get('/:id',findById);



module.exports = router;