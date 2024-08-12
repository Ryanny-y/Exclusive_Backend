const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const { getWishlistProducts, addToWishlist, removeFromWishlist } = require('../../controller/api/wishlistController');

router.route('/')
  .post(verifyJWT, addToWishlist)
  .delete(verifyJWT, removeFromWishlist);

router.get('/:userId', verifyJWT, getWishlistProducts);

module.exports = router;