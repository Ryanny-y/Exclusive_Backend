const express = require('express');
const router = express.Router();
const { addToCart, getCartProducts, updateToCart, deleteFromCart } = require('../../controller/api/cartController');

router.route('/')
  .get(getCartProducts)
  .post(addToCart)
  .put(updateToCart)
  .delete(deleteFromCart)

module.exports = router;