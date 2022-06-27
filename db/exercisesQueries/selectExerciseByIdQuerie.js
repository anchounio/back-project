const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseById = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT e.id, e.name, e.photo, e.description, e.typology, e.muscularGroup, e.createAt, SUM(IFNULL(l.vote = 1, 0)) as likes
            FROM exercises e
            LEFT JOIN likes l
            ON e.id = l.idExercise
            WHERE e.id = ?
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
