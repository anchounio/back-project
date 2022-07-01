const { generateError } = require('../../helpers');
const getConnection = require('../getConnection');

const deleteExerciseQuery = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        // const [exercises] = await connection.query(
        //     `SELECT id FROM exercises WHERE id = ?`,
        //     [idExercise]
        // );

        // if (exercises.length < 1) {
        //     throw generateError('El ejercicio no existe', 404);
        // }

        await connection.query(`DELETE FROM exercises WHERE id = ?`, [
            idExercise,
        ]);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteExerciseQuery;
