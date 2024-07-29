const { where } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Renamed to User (capital "U") for convention

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log('Received refresh token:', refreshToken);
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findAll({ 
      where: {
        refresh_token: refreshToken,
      }
    });
    if (!user[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFFACCESS, (err, decoded) => {
      if (err) {
        console.log('Error verifying refresh token:', err);
        return res.sendStatus(403);
      }

      console.log('Decoded token info:', decoded);

      const userId = user[0].id_user;
      const username = user[0].username;
      const email = user[0].email;

      console.log('Creating new access token for user:', { userId, username, email });

      const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS, {
        expiresIn: '15s',
      });
      console.log('Generated access token:', accessToken);
      res.json({ accessToken });
    });
  } catch (err) {
    console.error('Error in refreshToken function:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { refreshToken };
