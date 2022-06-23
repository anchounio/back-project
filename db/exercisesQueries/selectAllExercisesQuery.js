const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectAllExercisesQuery = async (typology, muscular) => {
    let connection;

    let exercises;

    try {
        connection = await getConnection();

        if (typology || muscular) {
            [exercises] = await connection.query(
                `
                SELECT id, name, photo, typology, muscularGroup 
                FROM exercises
                WHERE typology LIKE ? OR muscularGroup LIKE ?
                `,
                [`%${typology}%`, `%${muscular}%`]
            );
        } else {
            [exercises] = await connection.query(
                `
                SELECT id, name, photo, typology, muscularGroup 
                FROM exercises`
            );
        }

        if (exercises.length < 1) {
            throw generateError('Ejercicio no encontrado', 404);
        }

        return exercises;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectAllExercisesQuery;
