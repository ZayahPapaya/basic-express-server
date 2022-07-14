//res.param.name ?
const { validator } = require('../src/middleware/validator');

describe('validator', () => {
  it('calls next', () => {
    const req = { method: 'GET', url: '/person/', params: {name: 'Zayah'}};
    const res = {};
    const next = jest.fn();
    validator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
})