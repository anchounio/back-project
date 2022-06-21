const likesExerciseQuery = require('../../db/exercisesQueries/likesExerciseQuery');
const likesCounterQuery = require('../../db/exercisesQueries/likesCounterQuery');

//const { generateError } = require('../../helpers');

const likesExercise = async (req, res, next) => {
    try {
        // Tomamos la id del ejercicio
        const { idExercise } = req.params;

        // Tomamos la id del usuario
        const idUser = req.user.id;

        await likesExerciseQuery(idExercise, idUser);

        const counter = await likesCounterQuery(idExercise);

        res.send({
            status: 'ok',
            message: `Se ha pulsado el botón de LIKE de este ejercicio. Ahora tiene ${counter} likes`,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = likesExercise;
