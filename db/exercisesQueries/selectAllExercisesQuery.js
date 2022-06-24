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
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) as likes
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                WHERE typology LIKE ? OR muscularGroup LIKE ?
                GROUP BY e.id
                ORDER BY e.createAt
                `,
                [`%${typology}%`, `%${muscular}%`]
            );
        } else {
            [exercises] = await connection.query(
                `
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) as likes
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                GROUP BY e.id
                ORDER BY e.createAt
                `
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
