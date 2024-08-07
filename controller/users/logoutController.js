const User = require('../../model/User');

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.sendStatus(204);
  const refresh_token = cookies.jwt;
  try {
    const foundUser = await User.findOne({ refresh_token }).exec();
    if(!foundUser) {
      res.clearCookie('jwt', { httpOnly: true }); // add to production sameSite: "None", secure: true
      return res.sendStatus(204);
    }
    foundUser.refresh_token = '';
    const user = await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true });
    console.log(user);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({"message": error.message})
  }   

}

module.exports = handleLogout;