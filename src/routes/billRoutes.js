const express = require('express');
const { validateToken } = require('../middleware');
const { getGrBill, newGrBill } = require('../model/billModel');

const billRoutes = express.Router();

billRoutes.get('/bill/:groupId', validateToken, async (req, res) => {
  try {
    const { groupId } = req.params;
    const data = await getGrBill(groupId);
    res.status(200).json({ success: true, msg: data });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'something went wrong' });
  }
});

billRoutes.post('/bill', validateToken, async (req, res) => {
  const { groupId, amount, description } = req.body;
  try {
    const data = await newGrBill(groupId, amount, description);
    if (data.affectedRows) {
      res.status(200).json({ success: true, msg: 'Bill was created successfully' });
      return;
    }
    res.status(500).json({ success: false, msg: 'something went wrong' });
  } catch (error) {
    res.status(500).json({ success: false, msg: 'something went wrong' });
  }
});

module.exports = billRoutes;
