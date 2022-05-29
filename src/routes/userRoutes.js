const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validateUser, validateUserLogin } = require('../middleware');
const { addUserToDb, findUserByEmail } = require('../model/userModel');
const { jwtSecret } = require('../config');

const userRoutes = express.Router();

userRoutes.post('/register', validateUser, async (req, res) => {
  const { fullName, email, password } = req.body;
  const plainTextPassword = password;
  const hashedPassword = bcrypt.hashSync(plainTextPassword, 10);
  console.log('hashedPassword ===', hashedPassword);
  const newUser = {
    fullName,
    email,
    password: hashedPassword,
  };
  const insertResult = await addUserToDb(
    newUser.fullName,
    newUser.email,
    newUser.password,
  );
  console.log('insertResult ===', insertResult);
  if (insertResult === false) {
    res.status(500).json('something wrong');
    return;
  }
  res.status(201).json('user created');
});

userRoutes.post('/login', validateUserLogin, async (req, res) => {
  const gautasEmail = req.body.email;
  const gautasSlaptazodis = req.body.password;
  const foundUser = await findUserByEmail(gautasEmail);
  console.log('foundUser ===', foundUser);
  if (!foundUser) {
    res.status(400).json('email or password not found (email)');
    return;
  }
  if (!bcrypt.compareSync(gautasSlaptazodis, foundUser.password)) {
    res.status(400).json('email or password not found (pass)');
    return;
  }
  const payload = { userId: foundUser.id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
  console.log('token ===', token);
  res.json({ success: true, token });
});

module.exports = userRoutes;
