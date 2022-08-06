'use strict';

const server = require('../src/server');
const { db } = require('../src/db');
const supertest = require('supertest');
const mockRequest = supertest(server.app);
// const bcrypt = require('bcrypt');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

describe('web server authentication', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
  });

  it('signs up users', async () => {
    const response = await mockRequest.post('/signup').send({ username: 'test user', password: 'test password' });
    expect(response.status).toBe(201);
    expect(response.body.username).toEqual('test user');

    expect(response.body.password.startsWith('$2b$10$')).toBe(true);
    expect(response.body.password.length).toBeGreaterThan(40);
    expect(response.body.password).not.toEqual('test password');
    // Run it once, get the error, and then
    // expect(response.body.password).toEqual(
    //   '$2b$10$IpbYE3WRzNPJn.t79nQ4E.9nYeOifrj0Od0vWZU2vxAsXsGEzz2xm'
    // );
    // expect(response.body.password).toEqual(
    //   await bcrypt.hash('test password', 10)
    // );
  });

  it('signs in users', async () => {
    await mockRequest.post('/signup').send({ username: 'singup_test', password: 'pogchamp' });
    const response = await mockRequest.get('/signin').send({ username: 'singup_test', password: 'pogchamp' });

    expect(response.status).toBe(200);
    expect(response.body.username).toEqual('singup_test');
    //expect(response.body.password).toStartWith('$2b$10$').toBe(true);
    expect(response.body.password).toMatch(new RegExp(/^\$2b\$10\$(.*)/g));
  });

  it('enforces unique users', async () => {
    const res1 = await mockRequest
      .post('/signup')
      .send({ username: 'test user', password: 'test password' });
    expect(res1.status).toBe(201);

    const response = await mockRequest
      .post('/signup')
      .send({ username: 'test user', password: 'test password' });

    console.log(response.body);
    expect(response.status).toBe(500);
  });
});