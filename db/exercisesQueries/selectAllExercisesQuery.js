const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectAllExercisesQuery = async (typology, muscular) => {
    let connection;

    let exercises;

    try {
        connection = await getConnection();

        if (typology && muscular) {
            [exercises] = await connection.query(
                `
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) AS likes, SUM(IFNULL(f.favourite = 1, 0)) AS favourites
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                LEFT JOIN favourites f
                ON e.id = f.idExercise
                WHERE typology = ? AND muscularGroup = ?
                GROUP BY e.id
                ORDER BY e.createAt
                `,
                [typology, muscular]
            );
        } else if (!typology && muscular) {
            [exercises] = await connection.query(
                `
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) AS likes, SUM(IFNULL(f.favourite = 1, 0)) AS favourites
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                LEFT JOIN favourites f
                ON e.id = f.idExercise
                WHERE muscularGroup = ?
                GROUP BY e.id
                ORDER BY e.createAt
                `,
                [muscular]
            );
        } else if (typology && !muscular) {
            [exercises] = await connection.query(
                `
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) AS likes, SUM(IFNULL(f.favourite = 1, 0)) AS favourites
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                LEFT JOIN favourites f
                ON e.id = f.idExercise
                WHERE typology = ?
                GROUP BY e.id
                ORDER BY e.createAt
                `,
                [typology]
            );
        } else {
            [exercises] = await connection.query(
                `
                SELECT e.id, e.name, e.photo, e.typology, e.muscularGroup, SUM(IFNULL(l.vote = 1, 0)) AS likes, SUM(IFNULL(f.favourite = 1, 0)) AS favourites
                FROM exercises e
                LEFT JOIN likes l
                ON e.id = l.idExercise
                LEFT JOIN favourites f
                ON e.id = f.idExercise
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
