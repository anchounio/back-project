const addFavouriteQuery = require('../../db/exercisesQueries/addFavouriteQuery');

//const { generateError } = require('../../helpers');

const addFavourite = async (req, res, next) => {
    try {
        // Tomamos la id del ejercicio
        const { idExercise } = req.params;

        // Tomamos la id del usuario
        const idUser = req.user.id;

        const addOrRemove = await addFavouriteQuery(idExercise, idUser);

        if (addOrRemove === 1) {
            res.send({
                status: 'ok',
                message: `Ejercicio añadido a favoritos`,
            });
        }

        if (addOrRemove === 0) {
            res.send({
                status: 'ok',
                message: `Ejercicio eliminado de favoritos`,
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = addFavourite;
