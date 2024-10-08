const User = require('../../model/User')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefresh = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.sendStatus(401);
  const refresh_token = cookies.jwt;
  try {
    const foundUser = await User.findOne({ refresh_token }).exec();
    if(!foundUser) return res.sendStatus(403);
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { "username": decoded.username},
          process.env.ACCESS_TOKEN_SECRET,
          { "expiresIn": "15m"}
        )
        res.json({ accessToken });
      }
    )
  } catch (error) {
    res.status(500).json({ "message": error.message });
  }

};

module.exports = handleRefresh;