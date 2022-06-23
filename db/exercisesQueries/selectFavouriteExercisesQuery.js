const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const selectFavouriteExercises = async (idUser) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT E.id, E.name, E.description, E.typology, E.muscularGroup, E.photo from exercises E
            INNER JOIN favourites F ON E.id = F.idExercise
            INNER JOIN users U ON U.id = F.idUser
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
