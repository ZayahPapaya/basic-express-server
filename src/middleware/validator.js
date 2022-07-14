// checks query string for name pro
'use strict';
const validator = (req, res, next) => {
  if(req.params){
    next(); // if name
  } else {
    throw new Error('no name');
}
};
module.exports = {
  validator,
};