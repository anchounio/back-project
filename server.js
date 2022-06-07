require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');

const app = express();

// Logger morgan.
app.use(morgan('dev'));

// Deserializamos un body con formato "raw".
app.use(express.json());

// Deserializamos un body con formato "form-data".
app.use(fileUpload());

/**
 * #################
 * ## Middlewares ##
 * #################
 */

const authUser = require('./middlewares/authUser');
const isAdmin = require('./middlewares/isAdmin');

/**
 * #########################
 * ## Endpoints Exercises ##
 * #########################
 */

const {
    newExercise,
    deleteExercise,
    updateExercise,
    listAllExercises,
} = require('./controllers/exercises');

// Crear un ejercicio.
app.post('/exercise', authUser, isAdmin, newExercise);

// borrar un ejercicio
app.delete('/exercise/:idExercise', authUser, isAdmin, deleteExercise);

// modificar un ejercicio
app.put('/exercise/:idExercise', authUser, isAdmin, updateExercise);

// listar todos los ejercicios
app.get('/exercises', authUser, listAllExercises);

/**
 * #####################
 * ## Endpoints Users ##
 * #####################
 */

const { newUser, loginUser } = require('./controllers/users');

// registrar un usuario
app.post('/users', newUser);

// logueo de usuarios
app.post('/login', loginUser);

/**
 * ######################
 * ## Middleware Error ##
 * ######################
 */

app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).send({
        status: 'error',
        message: err.message,
    });
});

/**
 * ##########################
 * ## Middleware Not Found ##
 * ##########################
 */

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not found',
    });
});

// Ponemos el servidor a escuchar peticiones:
app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`);
});
