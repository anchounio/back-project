const selectAllExercisesQuery = require('../../db/exercisesQueries/selectAllExercisesQuery');

const listAllExercises = async (req, res, next) => {
    try {
        const exercises = await selectAllExercisesQuery();

        res.send({
            status: 'ok',
            data: {
                exercises,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = listAllExercises;
