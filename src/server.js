// export object method start() and reference to express app
// /person route using validator. If valid, sen JSON response with the name
'use strict';
const express = require('express');
const { logger } = require('./middleware/logger');
const { validator } = require('./middleware/validator');

const hello = (req, res) => res.status(200).send('Hello, World');
const missing = (req, res) => res.status(404).send('Not found');

const data = (req, res) => {
  res.status(200).send({
    name: 'Zayah',
    role: 'Student'
  });
};

const app = express();

app.use(logger);
app.use(validator);

app.get('/', hello);
app.get('/data', data);
app.get('/person');
app.get('*', missing);

function start(port) {
  app.listen(port, () => console.log(`Server up on port ${port}`));
}
module.exports = {
  app,
  start,
};