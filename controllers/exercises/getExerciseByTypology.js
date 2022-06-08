const selectExerciseByTypologyQuery = require('../../db/exercisesQueries/selectExerciseByTypologyQuery');

const getExerciseByTypology = async (req, res, next) => {
    try {
        const { typology } = req.params;

        const exercise = await selectExerciseByTypologyQuery(typology);

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

module.exports = getExerciseByTypology;
