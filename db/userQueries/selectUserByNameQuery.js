const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const selectUserByNameQuery = async (name) => {
    let connection;

    try {
        connection = await getConnection();

        // se crea el array de usuarios con ese name
        const [users] = await connection.query(
            `SELECT id, name, email, password, role FROM users WHERE name = ?`,
            [name]
        );

        // si no existe, error
        if (users.length < 1) {
            throw generateError('Usuario no encontrado', 404);
        }

        // se devuelve el usuario en la posición 0
        return users[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectUserByNameQuery;
