const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [{
    productId: {
      type: String,
    },
    quantity: {
      type: Number
    }
  }]
});


module.exports = mongoose.model('Cart', CartSchema);