const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectUserByIdQuery = async (idUser) => {
  let connection;

  try {
    connection = await getConnection();

    // creamos el array de usuarios
    const [users] = await connection.query(
      `SELECT id, name, email, role FROM users WHERE id = ?`,
      [idUser]
    );

    // si no hay usuarios, error
    if (users.length < 1) {
      throw generateError('Usuario no encontrado', 404);
    }

    // devolvemos el usuario encontrado en la posición 0
    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
