const getConnection = require('../getConnection');

const { generateError } = require('../../helpers');

const likesCounterQuery = async (idExercise) => {
    let connection;

    try {
        connection = await getConnection();

        const [exercises] = await connection.query(
            `
            SELECT COUNT(vote) as VOTE from likes WHERE idExercise = ? and vote = true
            `,
            [idExercise]
        );

        return exercises[0].VOTE;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = likesCounterQuery;
