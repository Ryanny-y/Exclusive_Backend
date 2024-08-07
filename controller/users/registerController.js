const User = require('../../model/User');
const Cart = require('../../model/Cart');
const Wishlist = require('../../model/Wishlist')
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { first_name, username, password } = req.body;
  if(!first_name || !username || !password ) return res.status(400).json({"message": "All fields are required"});
   try {
    const duplicate = await User.findOne({ username }).exec();
    if(duplicate) return res.status(409).json({"message": "Username already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      first_name,
      username,
      password: hashedPassword
    });

    const cart = await Cart.create({
      userId: newUser._id,
      products: []
    })

    const wishlist = await Wishlist.create({
      userId: newUser._id,
      products: []
    })

    newUser.cart = cart._id,
    newUser.wishlist = wishlist._id;

    await newUser.save();

    res.status(201).json({"message": `User ${newUser.username} created!`})
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }

}

module.exports = handleNewUser;