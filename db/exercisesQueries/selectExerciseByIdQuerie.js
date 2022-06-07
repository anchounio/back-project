const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseById = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT * from exercises WHERE id = ?
            `,
            [idExercise]
        );

        if (exercises.length < 1) {
            throw generateError('Ejercicio no encontrado', 404);
        }

        return exercises[0];
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectExerciseById;
