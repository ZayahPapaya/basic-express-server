//500/Server Error message, import to server
'use strict';
function do500 (error, req, res, next) {
  res.status(500).body(`Handling ${req.path}, there was an exception ${err.message}`);
  };
module.exports = {
  do500,
};