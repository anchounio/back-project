const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const insertExercise = require('../../db/exercisesQueries/insertExerciseQuery');

const { generateError, createPathIfNotExists } = require('../../helpers');

const newExercise = async (req, res, next) => {
    try {
        // Obtenemos los campos del body.
        const { name, description, tipology, muscularGroup } = req.body;

        // Si faltan campos lanzamos un error. Todos obligatorios menos foto.
        if (!name || !description || !tipology || !muscularGroup) {
            throw generateError('Faltan campos', 400);
        }

        if (description.length > 280) {
            throw generateError(
                'La descripción supera los 280 caracteres',
                400
            );
        }

        // Variable donde almacenaremos el nombre con el que guardaremos la imagen
        // en el disco.
        let photoName;

        // Si la imagen existe la guardamos.
        if (req.files && req.files.photo) {
            // Creamos una ruta absoluta al directorio de descargas.
            const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

            // Creamos el directorio si no existe.
            await createPathIfNotExists(uploadsDir);

            // Procesamos la imagen y la convertimos en un objeto de tipo "Sharp".
            const sharpImg = sharp(req.files.photo.data);

            // Redimensionamos la imagen para evitar que sean demasiado grandes.
            // Le asignamos 500px de ancho.
            sharpImg.resize(500);

            // Generamos un nombre único para la imagen.
            photoName = `${nanoid(24)}.jpg`;

            // Generamos la ruta absoluta a la imagen.
            const imgPath = path.join(uploadsDir, photoName);

            // Guardamos la imagen en el directorio de descargas.
            await sharpImg.toFile(imgPath);
        }

        // Creamos un nuevo ejercicio en la base de datos.
        // Agregamos el tweet.
        insertExercise(name, description, tipology, muscularGroup, photoName);

        res.send({
            status: 'ok',
            message: `Ejercicio creado`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newExercise;
