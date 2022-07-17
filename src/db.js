
const { Sequelize, DataTypes } = require('sequelize');
const { player } = require('./models/playerModel');
const { item } = require('./models/itemModel');
let connection_string;

switch (process.env.NODE_ENV) {
  case 'production':
    connection_string = process.env.DATABASE_URL;
    break;
  case 'dev':
    connection_string = 'sqlite::memory:';
    break;
  case 'staging': // empty
    // connection_string = `sqlite:${process.env.SQLITE_FILE}`;
    // break;
  default:
    connection_string = `sqlite:${process.env.SQLITE_FILE ?? '../db'}`;
    break;
  }

  const db = new Sequelize(connection_string, {
    dialectOptions: { // for postgres only
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });


db.sync();//in development only, it rejiggers the DB. Can remove or overwrite data.
module.exports = {
  db,
  Player: player(db),
  Item: item(db)
};