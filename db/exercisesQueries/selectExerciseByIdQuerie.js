const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseById = async (idUser, idExercise) => {
    let connection;

    console.log('la id de usuario es');
    console.log(idUser);

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT  e.id AS idEjercicio, e.name, e.photo, e.description, e.typology, e.muscularGroup, e.createAt, u.id AS idUsuario, SUM(IFNULL(l.vote = 1, 0)) AS likes, IFNULL(f.favourite = 1, 0) AS favourites, BIT_OR(l.idUser = ? AND l.vote = 1) AS likedByMe, BIT_OR(f.idUser = 1 AND f.favourite = 1) AS favedByMe
            FROM exercises e
            LEFT JOIN likes l
            ON e.id = l.idExercise
            LEFT JOIN users u
            ON l.idUser = u.id
            LEFT JOIN favourites f
            ON e.id = f.idExercise
            WHERE e.id = ?
            `,
            [idUser, idExercise]
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
