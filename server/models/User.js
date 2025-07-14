const { Pool } = require('pg');
const db = require('../db');

const createUser = async (email, passwordHash, firstName, lastName) => {
  const result = await db.query(
    'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, passwordHash, firstName, lastName]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };