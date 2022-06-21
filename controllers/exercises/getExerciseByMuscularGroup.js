const selectExerciseByMuscularGroupQuery = require('../../db/exercisesQueries/selectExerciseByMuscularGroupQuery');

const getExerciseByMuscularGroup = async (req, res, next) => {
    try {
        const { muscularGroup } = req.params;
        const exercise = await selectExerciseByMuscularGroupQuery(
            muscularGroup
        );

        res.send({
            status: 'ok',
            data: {
                exercise,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getExerciseByMuscularGroup;
