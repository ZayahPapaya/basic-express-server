// checks query string for name pro
'use strict';
const validator = (req, res, next) => {
  if (!req.params.name) {
    throw new Error('no name');
  }
  next(); // if name
};
module.exports = {
  validator,
};