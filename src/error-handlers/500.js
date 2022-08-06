//500/Server Error message, import to server
'use strict';
function do500 (error, req, res, next) {
  res.status(500).send(`Handling ${req.path}, there was an exception ${error.message}`);
  };
module.exports = {
  do500,
};