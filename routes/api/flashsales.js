const express = require('express');
const router = express.Router();
const { getProducts, createProduct } = require('../../controller/api/flashsaleController');

router.route('/')
  .get(getProducts)
  .post(createProduct);

module.exports = router;