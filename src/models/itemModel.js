const { DataTypes } = require('sequelize');

function item(db) {
const Item = db.define('Item', {
  name: DataTypes.STRING,
  alc: DataTypes.INTEGER,
});
}
module.exports = { item };