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

const { newExercise } = require('./controllers/exercises');

// Crear un ejercicio.
app.post('/exercise', authUser, isAdmin, newExercise);

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

// Ponemos el servidor a escuchar peticiones:
app.listen(PORT, () => {
  console.log(`Server listening http://localhost:${PORT}`);
});
