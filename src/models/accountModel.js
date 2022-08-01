const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function account(db) {
  return db.define('account', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: { type: DataTypes.VIRTUAL, get() { return jwt.sign({username: this.username, role: this.role}, SECRET)} }
});
}
module.exports = { account };