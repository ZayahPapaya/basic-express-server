const { DataTypes } = require('sequelize');

function player(db) {
  return db.define('Player', {
    username: DataTypes.STRING,
    level: DataTypes.INTEGER,
  });
}
module.exports = { player };