'use strict';
let base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Account } = require('../db');
const { app } = require('../server');
//const SECRET = 'pog' // JWT encoded signature as env WRONG? plaintext JWT password

const signup = async (req, res) => {
  try {
    //req.body.password = base64.decode(req.body.password);
    console.log(`USERNAME: ${req.body.username}`);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(`PASSWORD: ${req.body.password}`);
    const response = await Account.findAll({ where: { role: 'admin' } });
    console.log(`RESPONSE: ${response}`);
    if (response === null) {
      req.body.role = 'admin'
    } else {
      req.body.role = 'user'
    };
    await Account.create(req.body);
    res.status(201).send({ username: req.body.username, password: req.body.password });
  } catch (error) {
    res.status(500).send('Error creating account');
    console.log('Account creation failed, error:', error);
  }
}

const login = async (req, res) => {
  console.log('BANANA');
  // jwt.io
  // TODO: get jetbrains mono
  // TODO: build in authorization logic to CRUD as middleware
  try {
    console.log(`SEARCH USERNAME: ${req.body.username}`);
    const password = await Account.findOne({ where: { username: req.body.username } });
    console.log('Database password found: ',password.password)
    //req.body.password = base64.decode(req.body.password);
    //console.log('Post decode password', req.body.password);
    if (bcrypt.compare(req.body.password, password.password)) {
      res.status(200).send({ username: req.body.username, password: password.password, token: process.env.SECRET });
    } else {
      res.status(403).send('Incorrect login information');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging in');
    console.log('Server error when logging in:', error);
  }
}

module.exports = {
  signup,
  login,
}