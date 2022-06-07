const getConnection = require('../getConnection');

const updateExerciseQuery = async (
    name,
    description,
    typology,
    muscularGroup,
    photo = '',
    idExercise
) => {
    let connection;

    try {
        connection = await getConnection();

        if (name) {
            await connection.query(
                `UPDATE exercises 
                SET name = ? WHERE id = ?`,
                [name, idExercise]
            );
        }

        if (description) {
            await connection.query(
                `UPDATE exercises 
                SET description = ? WHERE id = ?`,
                [description, idExercise]
            );
        }

        if (typology) {
            await connection.query(
                `UPDATE exercises 
                SET typology = ? WHERE id = ?`,
                [typology, idExercise]
            );
        }

        if (muscularGroup) {
            await connection.query(
                `UPDATE exercises 
                SET muscularGroup = ? WHERE id = ?`,
                [muscularGroup, idExercise]
            );
        }

        if (photo) {
            await connection.query(
                `UPDATE exercises 
                SET photo = ? WHERE id = ?`,
                [photo, idExercise]
            );
        }
    } finally {
        if (connection) connection.release();
    }
};

module.exports = updateExerciseQuery;
