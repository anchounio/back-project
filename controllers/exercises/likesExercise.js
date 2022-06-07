const likesExerciseQuery = require('../../db/exercisesQueries/likesExerciseQuery');

//const { generateError } = require('../../helpers');

const likesExercise = async (req, res, next) => {
    try {
        // Tomamos la id del ejercicio
        const { idExercise } = req.params;

        // Tomamos la id del usuario
        const idUser = req.user.id;

        await likesExerciseQuery(idExercise, idUser);

        res.send({
            status: 'ok',
            message: 'Ejercicio modificado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = likesExercise;
