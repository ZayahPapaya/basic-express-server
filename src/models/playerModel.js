const { DataTypes } = require('sequelize');

function player(db) {
const Player = db.define('Player', {
  username: DataTypes.STRING,
  level: DataTypes.INTEGER,
});
}
module.exports = { player };