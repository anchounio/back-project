const selectExerciseById = require('../../db/exercisesQueries/selectExerciseByIdQuerie');
const deleteExerciseQuery = require('../../db/exercisesQueries/deleteExerciseQuery');

const { deletePhoto } = require('../../helpers');

const deleteExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;

        // Obtenemos la info del ejercicio que queremos borrar.
        const exercise = await selectExerciseById(idExercise);

        // Si el ejercicio tiene vinculada una imagen la eliminamos del disco.
        if (exercise.photo) {
            await deletePhoto(exercise.photo);
        }

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
