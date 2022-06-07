const updateExerciseQuery = require('../../db/exercisesQueries/updateExerciseQuery');

const updateExercise = async (req, res, next) => {
    try {
        const {
            name,
            description,
            typology,
            muscularGroup,
            photo,
            idExercise,
        } = req.params;

        await updateExerciseQuery(
            name,
            description,
            typology,
            muscularGroup,
            photo,
            idExercise
        );

        res.send({
            status: 'ok',
            message: 'Ejercicio modificado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateExercise;
