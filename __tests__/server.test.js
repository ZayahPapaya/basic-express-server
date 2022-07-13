'use strict';

const { it, expect } = require('@jest/globals');
const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);

describe('Node Server', () => {

  it('says hello world', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, World');
  });

  it('returns some data', async () => {
    const response = await request.get('/data');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'Zayah',
      role: 'Student',
    });
  });

  it('returns a bad route', async () => {
    const response = await request.get('/missing');
    expect(response.status).toBe(404);
  });

  it('returns no name in query', async () => {
    const response = await request.get(`/person:${null}`);
    expect(response.status).toBe(500);
  });

  it('returns name', async () => {
    const response = await request.get(`/person:${ { name: Zayah } }`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Zayah');
  });

});
