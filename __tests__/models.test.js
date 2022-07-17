const { db } = require("../src/db")

describe('models', () =>  {
  beforeEach(async () => {
    await db.sync();
  })
  it('has a model', () => {});
})