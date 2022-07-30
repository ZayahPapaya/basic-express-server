const Collection = require('./../models/collection');

class AccountManagement extends Collection { //super create? 
  async create(req, res) { // json
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      res.status(201).send(await this.model.build(req.body).save());
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}
module.exports = AccountManagement;