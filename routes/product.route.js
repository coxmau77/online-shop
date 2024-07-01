const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller')

router.post('/create', productController.createProduct);
router.get('/all', productController.getAll);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.uploadProduct);

router.get('/', (request, response) => {
    response.status(200).send("get index productos");
});

router.post('/', (request, response) => {
    response.status(200).send("post index productos");
});


module.exports = router;