const express = require('express');
const router = express.Router();
const { getWishlistProducts, addToWishlist, removeFromWishlist } = require('../../controller/api/wishlistController');

router.route('/')
  .get(getWishlistProducts)
  .post(addToWishlist)
  .delete(removeFromWishlist)

module.exports = router;