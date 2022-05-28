const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error in executeDb ===', error);
    throw error;
  } finally {
    conn?.end();
  }
}

function instertInto(group_id, user_id) {
  const sql = 'INSERT INTO accounts (group_id, user_id) VALUES (?, ?)';
  return executeDb(sql, [group_id, user_id]);
}
function joinInto(id) {
  const sql =
    'SELECT * FROM accounts LEFT JOIN groups ON accounts.group_id = groups.id WHERE user_id = ?';
  return executeDb(sql, [id]);
}

async function addUserToAcc(req, res) {
  const { group_id, user_id } = req.body;
  const idfromToken = req.userId;
  try {
    const saveResult = await instertInto(group_id, idfromToken);
    if (saveResult.affectedRows === 1) {
      res.sendStatus(201);
      return;
    }
    res.status(400).json('Cant add account');
  } catch (error) {
    console.log('error in addUserToAcc ===', error);
    res.sendStatus(500);
  }
}

async function userAccJoin(req, res) {
  const idfromToken = req.userId;
  try {
    const accountGroupArr = await joinInto(idfromToken);
    res.json(accountGroupArr);
  } catch (error) {
    console.log('userAccJoin error ===', error);
    res.sendStatus(500);
  }
}

module.exports = {
  addUserToAcc,
  userAccJoin,
};
