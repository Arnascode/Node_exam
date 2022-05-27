const express = require('express');
const { validateToken } = require('../middleware');
const { insertAccDb } = require('../model/accModel');

const accRoutes = express.Router();
// sukuriam booksRoutes routeri

// POST /accounts/ - endpointas skirtas priskirti vartotoją kažkuriai grupei. Vartotojas paduoda
// group_id ir savo token (is kurio galite pasiimti user_id). Sukuriamas įrašas lentelėje accounts.
accRoutes.post('/accounts', validateToken, async (req, res) => {
  try {
    const newAccObj = req.body;
    const createAccResult = await insertAccDb(newAccObj);
    if (createAccResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('no Account created');
  } catch (error) {
    res.sendStatus(500);
  }
});

// groupRoutes.get('/group', validateToken, async (req, res) => {
//   try {
//     const artArr = await getGroupsDB();
//     res.json(artArr);
//   } catch (error) {
//     console.log('articleRoutes.get error ===', error);
//     res.sendStatus(500);
//   }
// });
module.exports = accRoutes;

// GET /accounts/ - paduoda visas prisijungusio vartotojo grupes (JOIN su groups). ID pasiima iš token.
