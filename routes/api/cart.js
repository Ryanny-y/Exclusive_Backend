const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { addToCart, getCartProducts, updateToCart, deleteFromCart, clearCart } = require('../../controller/api/cartController');

router.route('/')
  .post(verifyJWT, addToCart)
  .put(verifyJWT, updateToCart)
  .delete(verifyJWT, deleteFromCart)

router.get('/:userId', verifyJWT, getCartProducts);

router.delete('/clear', clearCart);

module.exports = router;