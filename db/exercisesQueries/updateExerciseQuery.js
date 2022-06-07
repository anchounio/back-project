const getConnection = require('../getConnection');

const updateExerciseQuery = async (
    idExercise,
    name,
    description,
    photo,
    typology,
    muscularGroup
) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE exercises 
            SET name = ?, description = ?, photo = ?, typology = ?, muscularGroup = ?
            WHERE id = ?`,
            [name, description, photo, typology, muscularGroup, idExercise]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateExerciseQuery;
