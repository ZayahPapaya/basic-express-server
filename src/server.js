// export object method start() and reference to express app
// /person route using validator. If valid, sen JSON response with the name
'use strict';
const express = require('express');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');
//require('./db');
const PlayerHandler = require('./handlers/playerHandler');
const ItemHandler = require('./handlers/itemHandler');
const hello = (req, res) => res.status(200).send('Hello, World');
//const missing = (req, res) => res.status(404).send('Not found');
const yikes = (req, res) => res.status(500).send('Yikes');
const { do404 } = require('./error-handlers/404');
const { do500 } = require('./error-handlers/500');
const Collection = require('./models/collection');
require('./db');
const { db, Player, Item } = require('./db');
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

app.get('/', hello);

// app.get('/player', PlayerHandler.listPlayers);
// app.post('/player', PlayerHandler.createPlayer);
// app.get('/player/:id', PlayerHandler.getPlayer);
// app.put('/player/:id', PlayerHandler.updatePlayer);
// app.delete('/player/:id', PlayerHandler.deletePlayer);

// app.get('/item', ItemHandler.listItems);
// app.post('/item', ItemHandler.createItem);
// app.get('/item/:id', ItemHandler.getItem);
// app.put('/item/:id', ItemHandler.updateItem);
// app.delete('/item/:id', ItemHandler.deleteItem);

new Collection(Player, app, 'player');
new Collection(Item, app, 'item');


//new Collection(Drink, app, 'drink');









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