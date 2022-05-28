const express = require('express');
const { validateToken } = require('../middleware');
const { getGroupsDB, postNewGrp } = require('../model/groupModel');

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

groupRoutes.post('/group', validateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const data = await postNewGrp(name);
    if (data.affectedRows === 1) {
      res.status(201).json({ success: true, message: 'Group was create successful' });
      return;
    }
    throw new Error('something went wrong posting group');
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = groupRoutes;
