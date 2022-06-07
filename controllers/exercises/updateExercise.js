const updateExerciseQuery = require('../../db/exercisesQueries/updateExerciseQuery');

const updateExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        await updateExerciseQuery(idExercise);

        res.send({
            status: 'ok',
            message: 'Ejercicio modificado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateExercise;
