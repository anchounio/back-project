const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectExerciseById = async (idUser, idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        const [likesCounter] = await connection.query(
            `
            SELECT COUNT(vote) as VOTE from likes WHERE idExercise = ? and vote = true
            `,
            [idExercise]
        );

        const [exercises] = await connection.query(
            `
            SELECT e.id AS idEjercicio, ? AS totalLikes, e.name, e.photo, e.description, e.typology, e.muscularGroup, e.createAt, ? AS idUsuario, BIT_OR(l.idUser = ? AND l.vote = 1) AS likedByMe, BIT_OR(f.idUser = ? AND f.favourite = 1) AS favedByMe
            FROM exercises e
            LEFT JOIN likes l
            ON e.id = l.idExercise
            LEFT JOIN users u
            ON l.idUser = u.id
            LEFT JOIN favourites f
            ON e.id = f.idExercise
            WHERE e.id = ?
            `,
            [likesCounter[0].VOTE, idUser, idUser, idUser, idExercise]
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
