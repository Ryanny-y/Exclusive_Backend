const mongoose = require('mongoose');
const { Schema } = mongoose;

// name, description, image, price, stock_quantity, stock_status, ratings { stars, count }, category, colors, size, keyword, 
const ProductSchema = new Schema({
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
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  stock_quantity: {
    type: Number,
    required: true
  },
  stock_status: {
    type: String,
    default: "In Stock"
  },
  ratings: {
    stars: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
  },
  category: [{
    type: String,
    required: true
  }],
  colors: [{
    type: "String"
  }],
  size: [{
    type: "String"
  }],
  keywords: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('Product', ProductSchema);