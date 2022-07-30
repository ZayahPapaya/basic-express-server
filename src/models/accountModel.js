const { DataTypes } = require('sequelize');

function account(db) {
  return db.define('account', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
}
module.exports = { account };