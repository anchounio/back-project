const selectExerciseById = require('../../db/exercisesQueries/selectExerciseByIdQuerie');

const getExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        const tweet = await selectExerciseById(idExercise);

        res.send({
            status: 'ok',
            data: {
                tweet,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getExercise;
