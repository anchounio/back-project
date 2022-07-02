const selectFavouriteExercises = require('../../db/exercisesQueries/selectFavouriteExercisesQuery');

const getFavouriteExercises = async (req, res, next) => {
    try {
        const idUser = req.user.id;

        const exercises = await selectFavouriteExercises(idUser);

        res.send({
            status: 'ok',
            data: {
                exercises,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = getFavouriteExercises;
