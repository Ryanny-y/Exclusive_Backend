const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');
const Message = require('../../model/Message');

router.post('/', verifyJWT, async (req, res) => {
  const { user_id, name, email, phone_number, message } = req.body;
  
  if(!user_id || !name || !email || !message) return res.status(400).json({ error: 'Name, Email, and Message are required!'});

  try {
    await Message.create({
      user_id,
      name,
      email,
      phone_number,
      message
    });

    res.status(201).json({ message: `Thank You For Messaging! We Appreciate Your Effort.`})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

module.exports = router