const mongoose = require('mongoose');
const { Schema } = mongoose;


const messageSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_number: String,
  message: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Message', messageSchema);