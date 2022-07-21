class Collection {
  constructor(model, app, routeName) {
    this.model = model;
    this.routeModel(app, routeName);
  }

  async create(req, res) { // json
    try {
      console.log(req.body, "CREATE BODY");
      const pog = this.model.build(req.body);
      await pog.save();
      res.status(201).send(pog);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async read(req, res) {
    let records = null;
    let options = {};
    const id = req.params.id;
    try {
      if (id) {
        options['where'] = { id };
        records = await this.model.findOne(options);
      } else {
        records = await this.model.findAll(options);
      }
      res.status(200).send(records);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async update(req, res) {
    const id = req.params.id;
    try {
      if (!id) throw new Error('No target ID');
      res.status(200).send(await this.model.update(req.body, { where: { id } }));
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    try {
      if (!id) throw new Error('No target ID');
      res.status(200).send(await this.model.destroy({ where: { id } }));
    } catch (error) {
      res.status(500).send(error);
    }
  }

  routeModel = (app, routeName) => {
    app.get(`/${routeName}`, this.read);
    app.post(`/${routeName}`, this.create);
    app.get(`/${routeName}/:id`, this.read);
    app.put(`/${routeName}/:id`, this.update);
    app.delete(`/${routeName}/:id`, this.delete);
  };
}
module.exports = Collection;