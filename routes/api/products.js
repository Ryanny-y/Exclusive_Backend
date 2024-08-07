const express = require('express');
const router = express.Router();
const { getAllProducts, createNewProduct, getSingleProduct } = require('../../controller/api/productController');
 
// get all products
router.get('/', getAllProducts);
router.post('/', createNewProduct)

// get by id
router.get('/:id', getSingleProduct);

module.exports = router;