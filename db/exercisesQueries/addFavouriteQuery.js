const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const addFavouriteQuery = async (idExercise, idUser) => {
    let connection;

    try {
        connection = await getConnection();

        // Comprobamos si existe el ejercicio. De lo contrario se mostrará error.
        let [checkExercise] = await connection.query(
            `
            SELECT id from exercises WHERE id = ?                
            `,
            [idExercise]
        );
        if (!checkExercise[0]) {
            throw generateError('Ejercicio no encontrado', 404);
        }

        // Comprobamos si existe esta fila en la tabla
        let [check2] = await connection.query(
            `
                SELECT favourite from favourites WHERE idUser = ? and idExercise = ?                
            `,
            [idUser, idExercise]
        );

        // Si no existe esa fila se crea
        if (check2.length < 1) {
            await connection.query(
                `
                    INSERT INTO favourites (idUser, idExercise)
                    VALUES (?, ?)
                `,
                [idUser, idExercise]
            );
            //Se selecciona y se devuelve el valor de favorito
            // [check2] = await connection.query(
            //     `
            //         SELECT favourite from favourites WHERE idUser = ? and idExercise = ?
            //     `,
            //     [idUser, idExercise]
            // );

            //return true;
        } else {
            // Si la fila ya existía se cambia de true a false y viceversa
            await connection.query(
                `
                    UPDATE favourites SET favourite = NOT favourite WHERE idUser = ? and idExercise = ?
                `,
                [idUser, idExercise]
            );

            // Se comprueba ahora el estado en el que está (0 o 1)
            const [check2] = await connection.query(
                `
                    SELECT favourite from favourites WHERE idUser = ? and idExercise = ?
                `,
                [idUser, idExercise]
            );

            return check2[0].favourite;
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addFavouriteQuery;
