'use strict';

//const { it, expect } = require('@jest/globals');
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
    const response = await request.get(`/person/`);
    expect(response.status).toBe(500);
  });

  it('returns name', async () => {
    const response = await request.get(`/person/Zayah`);
    expect(response.status).toBe(200);
    expect(response.body.name).toMatch(/Zayah/);
  });
  
  it('starts on a port', () => {
    jest.spyOn(server.app, 'listen').mockImplementation();

    server.start(3000);

    expect(server.app.listen).toHaveBeenCalledWith(3000, expect.anything());
  });

});

describe('CRUD operations', () => {
  let testPlayer;
  let testItem;
  it('Creates a player record', async () => {
    const response = await request.post('/player').send({ username: 'Nooblord', level: 1 });
    //console.log(response);
    expect(response.status).toBe(201);
  });
  it('Creates an item record', async () => {
    const response = await request.post('/item').send({ name: 'Dragon Warhammer', alc: 30000 });
    expect(response.status).toBe(201);
  });
  it('Reads a list of player records', async () => {
    const response = await request.get('/player');
    testPlayer = response.body[0].id;
    expect(response.status).toBe(200);
  });
  it('Reads a list of item records', async () => {
    const response = await request.get('/item');
    testItem = response.body[0].id;
    expect(response.status).toBe(200);
  });
  it('Finds a specific player', async () => {
    const response = await request.get(`/player/${testPlayer}`);
    expect(response.status).toBe(200);
  });
  it('Finds a specific item', async () => {
    const response = await request.get(`/item/${testItem}`);
    expect(response.status).toBe(200);
  });
  it('Updates a player', async () => {
    const response = await request.put(`/player/${testPlayer}`);
    expect(response.status).toBe(200);
  });
  it('Updates an item', async () => {
    const response = await request.put(`/item/${testItem}`);
    expect(response.status).toBe(200);
  });
  it('Deletes a player', async () => {
    const response = await request.delete(`/player/${testPlayer}`);
    expect(response.status).toBe(200);
  });
  it('Deletes an item', async () => {
    const response = await request.delete(`/item/${testItem}`);
    expect(response.status).toBe(200);
  });
  // it('Deletes players', async () => {
  //   const response = await request.get('/player');
  //   response.body.forEach(async value => {
  //     const pog = await request.delete(`/player/${value.id}`);
  //     //console.log(response.status);
  //   });
  //   expect(response.status).toBe(200);
  // });
  // it('Deletes items', async () => {
  //   const response = await request.get('/item');
  //   response.body.forEach(async value => {
  //     const pog = await request.delete(`/item/${value.id}`);
  //     //console.log(response.status);
  //   });
  //   expect(response.status).toBe(200);
  // });
});