const getConnection = require('../getConnection');

const insertExercise = async (
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
            `
                INSERT INTO exercises (name, description, typology, muscularGroup, photo)
                VALUES (?, ?, ?, ?, ?)
            `,
            [name, description, typology, muscularGroup, photo]
        );
    } finally {
        if (connection) connection.release();
    }
};

module.exports = insertExercise;
