const User = require('../../model/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const handleAuth = async (req, res) => {
  const { username, password } = req.body;
  
  if(!username || !password ) return res.status(400).json({"message": "All Fields are required."});

  try {
    const foundUser = await User.findOne({ username }).exec();
    if(!foundUser) return res.status(404).json({"message": `User ${username} Not Found!`})
    const match = await bcrypt.compare(password, foundUser.password);
    if(match) {
      // create jwt
      const accessToken = jwt.sign(
        { "username": foundUser.username }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      )

      const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      )

      foundUser.refresh_token = refreshToken;
      await foundUser.save();

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // In production secure: true, sameSite: 'None' 
      res.json({
        userData: {
          id: foundUser._id,
          firstName: foundUser.first_name,
          lastName: foundUser.last_name,
          username: foundUser.username,
          email: foundUser.email,
          address: foundUser.address,
        },
        accessToken
      });
    } else {
      return res.status(401).json({"message": "username or password is incorrect"})
    }

  } catch (error) {
    res.status(500).json({"message": error.message});
  }

};


module.exports = handleAuth 