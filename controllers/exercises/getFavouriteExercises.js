const selectFavouriteExercises = require('../../db/exercisesQueries/selectFavouriteExercisesQuery');

const getFavouriteExercises = async (req, res, next) => {
    try {
        const idUser = req.user.id;

        const exercise = await selectFavouriteExercises(idUser);

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

module.exports = getFavouriteExercises;
