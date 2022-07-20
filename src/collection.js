class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (error) {
      console.error('Could not create data');
      return error;
    }
  }

  async read(id, options = {}) {
    let records = null;
    try {
      if(id) {
        options['where'] = { id };
        records = await this.model.findOne(options);
      } else {
        records = await this.model.findAll(options);
      }
      return records;
    } catch (error) {
      console.error('Error reading data');
    }
  }
}