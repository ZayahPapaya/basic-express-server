const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
function validateToken(req, res, next) {
  const token = req.header['authorization'];
  const user = jwt.verify(token, SECRET);
  req.user = user;
  next();
}
module.exports = {
  validateToken,
}