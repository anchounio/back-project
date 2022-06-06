const { generateError } = require('../../helpers');

const getConnection = require('../getConnection');
const bcrypt = require('bcrypt');

const insertUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getConnection();

    // obtenemos un array de usuarios que cumplan la condición establecida
    const [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    // si el array tiene más de 0, es que hay un usuario con ese email
    // así que se tira un error
    if (users.length > 0) {
      throw generateError('Ya existe un usuario con ese email', 409);
    }

    // encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // creamos al usuario
    const [newUser] = await connection.query(
      `INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    // devolvemos el id del elemento creado
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
