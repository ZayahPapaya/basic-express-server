// export object method start() and reference to express app
// /person route using validator. If valid, sen JSON response with the name
'use strict';
const express = require('express');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');
//require('./db');
//const PlayerHandler = require('./handlers/playerHandler');
//const ItemHandler = require('./handlers/itemHandler');
const { signup, login } = require('./auth/accountHandler');
const { do404 } = require('./error-handlers/404');
const { do500 } = require('./error-handlers/500');
const hello = (req, res) => res.status(200).send('Hello, World');
const yikes = (req, res) => res.status(500).send('Yikes');

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const Collection = require('./models/collection');
//const AccountManagement = require('./auth/accountClass');
require('./db');
const { db, Player, Item, Account } = require('./db');
const name = (req, res) => res.status(200).send({ name: req.params.name });
const data = (req, res) => {
  res.status(200).send({
    name: 'Zayah',
    role: 'Student'
  });
};
const app = express();
//app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', hello);
// use middleware to verify login and return 403 forbidden

new Collection(Player, app, 'player');
new Collection(Item, app, 'item');
//new Collection(Account, app, 'signup');
//new AccountManagement(Account, app, 'signup');

app.post('/signup', signup);
app.get('/signin', login); // TODO: make this a login
app.get('/data', data);
app.get('/person/:name', validator, name);
app.get('/person/', yikes);
app.use(do404);
app.use(do500);

let shouldSyncOnStart = true;
function start(port) {
  if (shouldSyncOnStart) { // TODO define this somewhere useful
    db.sync();
  }
  app.listen(port, () => console.log(`Server up on port ${port}`));
};
module.exports = {
  app,
  start,
};