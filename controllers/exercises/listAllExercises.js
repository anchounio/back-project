const selectAllExercisesQuery = require('../../db/exercisesQueries/selectAllExercisesQuery');

const listAllExercises = async (req, res, next) => {
    try {
        const { typology } = req.query;
        const { muscular } = req.query;

        const exercises = await selectAllExercisesQuery(typology, muscular);

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
