const { DataTypes } = require('sequelize');

function item(db) {
  return db.define('Item', {
    name: DataTypes.STRING,
    alc: DataTypes.INTEGER,
  });
}
module.exports = { item };