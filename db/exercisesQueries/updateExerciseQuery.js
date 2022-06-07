const getConnection = require('../getConnection');

const updateExerciseQuery = async (
    idExercise,
    name,
    description,
    typology,
    muscularGroup,
    photo = ''
) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(
            `UPDATE exercises 
            SET name = ?, description = ?, typology = ?, muscularGroup = ?, photo = ?
            WHERE id = ?`,
            [name, description, typology, muscularGroup, photo, idExercise]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateExerciseQuery;
