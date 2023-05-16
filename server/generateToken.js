// module.exports = function generateToken(user) // call const generateToken = require('./generateToken.js')
const jwt = require('jsonwebtoken')

exports.generateToken = function (user) { // call const { generateToken } = require('./generateToken.js')
  
    const token = jwt.sign(
    { user_id: user.user_id, email: user.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
};
