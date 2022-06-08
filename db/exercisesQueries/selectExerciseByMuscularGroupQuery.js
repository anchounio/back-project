const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseByMuscularGroupQuery = async (muscularGroup) => {
    let connection;

    try {
        connection = await getConnection();
        const [exercises] = await connection.query(
            `
            SELECT name, photo, typology, muscularGroup 
            FROM exercises 
            WHERE muscularGroup = ?
            `,
            [muscularGroup]
        );

        if (exercises.length < 1) {
            throw generateError('Ejercicio no encontrado', 404);
        }

        return exercises;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectExerciseByMuscularGroupQuery;
