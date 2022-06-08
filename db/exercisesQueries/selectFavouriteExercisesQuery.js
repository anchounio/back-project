const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectFavouriteExercises = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT E.id, E.name, E.description, E.typology, E.muscularGroup, E.photo from exercises E
            INNER JOIN exercisesusers EU ON E.id = EU.idExercise
            INNER JOIN users U ON U.id = EU.idUser
            WHERE idUser = ? and favourite = 1 ;
            `,
            [idUser]
        );

        if (exercises.length < 1) {
            throw generateError(
                'El usuario no tiene ejercicios favoritos',
                404
            );
        }

        return exercises;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = selectFavouriteExercises;
