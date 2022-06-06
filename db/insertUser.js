const bcrypt = require('bcrypt');
const getConnection = require('./getConnection');

const { generateError } = require('../helpers');

const insertUser = async (name, email, password, role) => {
  let connection;

  try {
    connection = await getConnection();

    const [users] = await connection.query(
      `SELECT id FROM users WHERE name = ?`,
      [name]
    );

    if (users.length > 0) {
      throw generateError('Ya existe el usuario', 409);
    }

    const [newUser] = await connection.query(
      `INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)`,
      [name, email, password, role]
    );

    return newUser.insertID;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUser;
