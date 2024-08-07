const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId
  },
  refresh_token: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('User', UserSchema)