const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const likesExerciseQuery = async (idExercise, idUser) => {
    let connection;
    console.log(idExercise);
    console.log(idUser);

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
        let [check] = await connection.query(
            `
                SELECT vote from likes WHERE idUser = ? and idExercise = ?                
            `,
            [idUser, idExercise]
        );
        await connection.query(
            `
                UPDATE likes SET vote = ? WHERE idUser = ? and idExercise = ?
            `,
            [!check[0].vote, idUser, idExercise]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = likesExerciseQuery;
