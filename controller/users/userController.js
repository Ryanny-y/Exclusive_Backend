const User = require('../../model/User');
const bcrypt = require('bcrypt');

const getAllUser = async (req, res) => {
  try {
    const customers = await User.find();

    if(!customers || customers.length === 0) return res.status(204).json({ message: "No Users Retrieved!"});

    res.json(customers);
  } catch (error) {
    res.status(500).json({"error": error.message});
  }
};

const updateUser = async (req, res) => { 
  const { body, params: { userId } } = req;

  if(!userId) return res.status(400).json({"error": "User ID is required!"});
  if(!body) return res.status(400).json({"error":"Field to update is/are required."});

  try {
    // Find Matching User
    const foundUser = await User.findById(userId);
    if(!foundUser) return res.status(404).json({"error": "User Not Found!"});
    
    if(body.newPassword && body.password) {
      const isMatch = await bcrypt.compare(body.password, foundUser.password);
      if (!isMatch) return res.status(401).json({ "error": "Current Password is incorrect!" });

      body.password = await bcrypt.hash(body.newPassword, 10);
      delete body.newPassword;
    }
    
    // Update User
    const updatedUser = await User.findByIdAndUpdate(userId, body, { new: true });
    return res.json(updatedUser);
  } catch (error) {
    res.status(500).json({"error": error.message});
  }
}

module.exports = { getAllUser, updateUser }; 