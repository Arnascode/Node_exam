const express = require('express');
const { validateToken } = require('../middleware');
const { getGroupsDB } = require('../model/groupModel');

const groupRoutes = express.Router();

groupRoutes.get('/group', validateToken, async (req, res) => {
  try {
    const artArr = await getGroupsDB();
    res.json(artArr);
  } catch (error) {
    console.log('articleRoutes.get error ===', error);
    res.sendStatus(500);
  }
});

module.exports = groupRoutes;
