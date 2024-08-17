const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  orders: [{
    order_items: [{
      productId: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      subtotal: {
        type: Number,
        required: true
      },
      _id: false
    }],
    subtotal: {
      type: Number,
      required: true
    },
    shipping_fee: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    payment_method: {
      type: String,
      required: true
    },
    order_date: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('Order', orderSchema);