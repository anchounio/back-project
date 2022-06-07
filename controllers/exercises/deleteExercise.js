const deleteExerciseQuery = require('../../db/exercisesQueries/deleteExerciseQuery');

const deleteExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        await deleteExerciseQuery(idExercise);

        res.send({
            status: 'ok',
            message: 'Ejercicio eliminado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = deleteExercise;
