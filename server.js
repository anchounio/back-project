require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Logger morgan.
app.use(morgan('dev'));

// Logger cors.
app.use(cors());

// Deserializamos un body con formato "raw".
app.use(express.json());

// Deserializamos un body con formato "form-data".
app.use(fileUpload());

// Indicamos a express en que directorio están los archivos estáticos.
app.use(express.static('uploads'));

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
    getExercise,
    // getExerciseByTypology,
    // getExerciseByMuscularGroup,
    likesExercise,
    addFavourite,
    getFavouriteExercises,
} = require('./controllers/exercises');

// Crear un ejercicio.
app.post('/exercises', authUser, isAdmin, newExercise);

// Borrar un ejercicio.
app.delete('/exercises/:idExercise', authUser, isAdmin, deleteExercise);

// Modificar un ejercicio.
app.put('/exercises/:idExercise', authUser, isAdmin, updateExercise);

// Listar todos los ejercicios.
app.get('/exercises', authUser, listAllExercises);

// Listar detalles de un ejercicio concreto.
app.get('/exercises/:idExercise', authUser, getExercise);

// Listar ejercicios por la categoría "tipología".
// app.get('/exercises/typology/:typology', authUser, getExerciseByTypology);

// Listar ejercicios por la categoría "grupo muscular".
// app.get(
//     '/exercises/muscularGroup/:muscularGroup',
//     authUser,
//     getExerciseByMuscularGroup
// );

// Listar ejercicios favoritos del usuario logueado.
app.get('/exercises/:idUser/favourites', authUser, getFavouriteExercises);

// Dar/Quitar like a un ejercicio.
app.put('/exercises/:idExercise/likes', authUser, likesExercise);

// Añadir/Quitar ejercicio favorito.
app.put('/exercises/:idExercise/favourite', authUser, addFavourite);

/**
 * #####################
 * ## Endpoints Users ##
 * #####################
 */

const { newUser, loginUser } = require('./controllers/users');

// Registrar un usuario.
app.post('/users', newUser);

// Logueo de usuarios.
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
