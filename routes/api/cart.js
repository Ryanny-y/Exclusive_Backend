const express = require('express');
const router = express.Router();
const { addToCart, getCartProducts, updateToCart, deleteFromCart } = require('../../controller/api/cartController');

router.route('/')
  .post(addToCart)
  .put(updateToCart)
  .delete(deleteFromCart)

router.get('/:userId', getCartProducts);

module.exports = router;