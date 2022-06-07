const updateExerciseQuery = require('../../db/exercisesQueries/updateExerciseQuery');

const updateExercise = async (req, res, next) => {
    try {
        const {
            name,
            description,
            photo,
            typology,
            muscularGroup,
            idExercise,
        } = req.params;

        await updateExerciseQuery(
            name,
            description,
            photo,
            typology,
            muscularGroup,
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
