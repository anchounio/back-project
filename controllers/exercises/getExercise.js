const selectExerciseById = require('../../db/exercisesQueries/selectExerciseByIdQuerie');

const getExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        const exercise = await selectExerciseById(idExercise);

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

module.exports = getExercise;
