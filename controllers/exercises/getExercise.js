const selectExerciseById = require('../../db/exercisesQueries/selectExerciseByIdQuerie');

const getExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        const idUser = req.user.id;

        const exercise = await selectExerciseById(idUser, idExercise);

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
