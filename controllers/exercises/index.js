const deleteExercise = require('./deleteExercise');
const listAllExercises = require('./listAllExercises');
const newExercise = require('./newExercise');
const updateExercise = require('./updateExercise');
const getExercise = require('./getExercise');
const getExerciseByTypology = require('./getExerciseByTypology');
const getExerciseByMuscularGroup = require('./getExerciseByMuscularGroup');

module.exports = {
    newExercise,
    deleteExercise,
    updateExercise,
    listAllExercises,
    getExercise,
    getExerciseByTypology,
    getExerciseByMuscularGroup,
};
