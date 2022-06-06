const getConnection = require('../getConnection');

const insertExercise = async (
  name,
  description,
  tipology,
  muscularGroup,
  photo = ''
) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
                INSERT INTO exercises (name, description, tipology, muscularGroup, photo)
                VALUES (?, ?, ?, ?, ?)
            `,
      [name, description, tipology, muscularGroup, photo]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertExercise;
