const User = require('../../model/User');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => { 
  const { body, params: { userId } } = req;

  if(!userId) return res.status(400).json({"message": "User ID is required!"});
  if(!body) return res.status(400).json({"message":"Field to update is/are required."});

  try {
    // Find Matching User
    const foundUser = await User.findById(userId);
    if(!foundUser) return res.status(404).json({"message": "User Not Found!"});
    
    if(body.newPassword && body.password) {
      const isMatch = await bcrypt.compare(body.password, foundUser.password);
      if (!isMatch) return res.status(401).json({ "message": "Password is incorrect!" });

      body.password = await bcrypt.hash(body.newPassword, 10);
      delete newPassword;
    }
    
    // Update User
    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
    return res.json(updatedUser);

  } catch (error) {
    res.status(500).json({"message": error.message});
  }

}

module.exports = { updateUser }; 