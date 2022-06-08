const deleteExercise = require('./deleteExercise');
const listAllExercises = require('./listAllExercises');
const newExercise = require('./newExercise');
const updateExercise = require('./updateExercise');
const getExercise = require('./getExercise');
const getExerciseByTypology = require('./getExerciseByTypology');
const getExerciseByMuscularGroup = require('./getExerciseByMuscularGroup');
const likesExercise = require('./likesExercise');
const addFavourite = require('./addFavourite');
const getFavouriteExercises = require('./getFavouriteExercises');

module.exports = {
    newExercise,
    deleteExercise,
    updateExercise,
    listAllExercises,
    getExercise,
    getExerciseByTypology,
    getExerciseByMuscularGroup,
    likesExercise,
    addFavourite,
    getFavouriteExercises,
};
