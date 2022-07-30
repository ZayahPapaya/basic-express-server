'use strict';
let base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Account } = require('../db');

//let string = 'someusername:P@55w0rD!';
//let encoded = base64.encode(string); // c29tZXVzZXJuYW1lOlBANTV3MHJEIQ==
//let decoded = base64.decode(encoded); // someusername:P@55w0rD!


//let password = 'supersecret';

// Create a new hashed password
//bcrypt.hash(password, 5).then(hashedPassword => { console.log(hashedPassword) });
// Validate a password
//bcrypt.compare(password, hashedPassword).then(isValid => { console.log(isValid) });
const signup = async (req, res) => {
  try {
    req.body.password = base64.decode(req.body.password);
    req.body.password = await bcrypt.hash(req.body.password, 3);
    res.status(201).json(await Account.create(req.body)); // TODO: Don't do this lmao, send back less data
  } catch (error) {
    res.status(500).send('Error creating account');
    console.log('Account creation failed, error:', error);
  }
}

const login = async (req, res) => {
  try {
    const password = await Account.findOne({where: { username: req.body.username }}); // TODO: Build in protection against duplicate usernames
    console.log('Database password found: ',password.password)
    req.body.password = base64.decode(req.body.password);
    console.log('Post decode password', req.body.password);
    if (bcrypt.compare(req.body.password, password.password)){
      res.status(200).send('Successful signin, INSERT TOKEN HERE');
    } else {
      res.status(403).send('Incorrect login information');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
    console.log('Server error when logging in:', error);
  }
}

module.exports = {
  signup,
  login,
}