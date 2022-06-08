const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const insertExercise = require('../../db/exercisesQueries/insertExerciseQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newExercise = async (req, res, next) => {
    try {
        // Obtenemos los campos del body. Estos datos van a ser obligatorios
        // para poder crear un ejercicios. Son todos menos la foto, esta es opcional.
        const { name, description, typology, muscularGroup } = req.body;

        // Si faltan campos lanzamos un error. Todos obligatorios menos foto.
        if (!name || !description || !typology || !muscularGroup) {
            throw generateError('Faltan campos', 400);
        }

        if (description.length > 280) {
            throw generateError(
                'La descripción supera los 280 caracteres',
                400
            );
        }

        // req.files hace referencia a cualquier fichero que mandemos
        // desde form-data. Aquí aparecerán por ejemplo las imágenes.
        console.log(req.files);

        // Variable donde almacenaremos el nombre con el que guardaremos la imagen
        // en el disco.
        let imgName;

        // Si existe alguna imagen, la guardaremos en una carpeta de nuestra base de datos.

        if (req.files && req.files.photo) {
            // Creamos una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            // Creamos el directorio si no existe.
            await createPathIfNotExists(uploadsDir);

            // Procesamos la imagen y la convertimos en un objeti de tipo "Sharp".
            const sharpImg = sharp(req.files.photo.data);

            // Redimensionamos la imagen para evitar que sean demasiado grandes.
            // Le asignamos 500px de ancho.
            sharpImg.resize(500);

            // Generamos un nombre único para la imagen.
            imgName = `${nanoid(24)}.jpg`;

            // Generamos la ruta absoluta a la imagen.
            const imgPath = path.join(uploadsDir, imgName);

            // Guardamos la imagen en el directorio de descargas.
            await sharpImg.toFile(imgPath);
        }

        // Creamos un nuevo ejercicio en la base de datos.
        insertExercise(name, description, typology, muscularGroup, imgName);

        res.send({
            status: 'ok',
            message: `Ejercicio creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newExercise;
