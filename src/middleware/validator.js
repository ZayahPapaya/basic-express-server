// checks query string for name pro'use strict';
const validator = (req, res, next) => {
  console.log(req.method, req.url);
  next(); // if name
};
module.exports = {
  validator,
};