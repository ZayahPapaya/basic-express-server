//console.log request method and path, import into server\
'use strict';
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};
module.exports = {
  logger,
};