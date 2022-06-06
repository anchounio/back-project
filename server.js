require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const newExercise = require('./controllers/exercises/newExercise');

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

// Crear un ejercicios.
app.post('/exercise', newExercise);
