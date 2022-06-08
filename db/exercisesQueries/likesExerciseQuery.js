const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const likesExerciseQuery = async (idExercise, idUser) => {
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
        const [check] = await connection.query(
            `
                SELECT likes from exercisesUsers WHERE idUser = ? and idExercise = ?                
            `,
            [idUser, idExercise]
        );
        console.log(check);
        // Si no existe esa fila se crea
        if (check.length === 0) {
            await connection.query(
                `
                    INSERT INTO exercisesUsers (idUser, idExercise, likes)
                    VALUES (?, ?, true)
                `,
                [idUser, idExercise]
            );
        } else {
            // Si la fila ya existía se cambia de true a false y viceversa
            console.log('existo!');
            await connection.query(
                `
                    UPDATE exercisesUsers SET likes = NOT likes WHERE idUser = ? and idExercise = ?
                `,
                [idUser, idExercise]
            );
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = likesExerciseQuery;
