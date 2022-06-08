const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const likesCounterQuery = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT likes from exercisesUsers WHERE idExercise = ?
            `,
            [idExercise]
        );

        if (exercises.length < 1) {
            throw generateError('Ejercicio no encontrado', 404);
        }

        return exercises[0].likes;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = likesCounterQuery;
