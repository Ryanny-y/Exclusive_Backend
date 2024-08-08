const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    productId: {
      type: String,
    },
    _id: false
  }],
});


module.exports = mongoose.model('Wishlist', WishlistSchema);