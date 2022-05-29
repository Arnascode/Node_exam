const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function getGrBill(groupId) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM bills WHERE group_id = ?';
    const [result] = await conn.execute(sql, [groupId]);
    return result;
  } catch (error) {
    throw Error(error);
  } finally {
    await conn?.end();
  }
}

async function newGrBill(groupId, amount, description) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO bills( group_id, amount, description) VALUES(?,?,?)';
    const [result] = await conn.execute(sql, [groupId, amount, description]);
    return result;
  } catch (error) {
    throw Error(error);
  } finally {
    await conn?.end();
  }
}

module.exports = {
  getGrBill,
  newGrBill,
};
