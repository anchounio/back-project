const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const updateExerciseQuery = require('../../db/exercisesQueries/updateExerciseQuery');

const { createPathIfNotExists } = require('../../helpers');

const updateExercise = async (req, res, next) => {
    try {
        const { idExercise } = req.params;
        const { name, description, typology, muscularGroup } = req.body;

        // PARA LA FOTO:

        // Si existe alguna imagen, la guardaremos en una carpeta de nuestra base de datos.

        // Variable donde almacenaremos el nombre con el que guardaremos la imagen
        // en el disco.
        let imgName;

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

        await updateExerciseQuery(
            name,
            description,
            typology,
            muscularGroup,
            imgName,
            idExercise
        );

        res.send({
            status: 'ok',
            message: 'Ejercicio modificado',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = updateExercise;
