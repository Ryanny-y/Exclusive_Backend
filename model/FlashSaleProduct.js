const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlashSaleProduct = new Schema({

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  stock_quantity: {
    type: Number,
    required: true
  },
  stock_status: {
    type: String,
    default: 'In Stock'
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  ratings: {
    count: {
      type: Number,
      default: 0
    },
    stars: {
      type: Number,
      default: 0
    }
  },
  colors: {
    type: String
  },
  size: [{
    type: String
  }],
});

module.exports = mongoose.model('Flashsale', FlashSaleProduct);