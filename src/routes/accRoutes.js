const express = require('express');
const { validateToken } = require('../middleware');
const { addUserToAcc, userAccJoin } = require('../model/accModel');

const accRoutes = express.Router();

accRoutes.post('/accounts', validateToken, addUserToAcc);
accRoutes.get('/accounts', validateToken, userAccJoin);

module.exports = accRoutes;
