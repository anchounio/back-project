const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const err = new Error(message);
    err.statusCode = status;
    return err;
};

const createPathIfNotExists = async (path) => {
    try {
        // intentamos acceder al directorio
        await fs.access(path);
    } catch {
        // si no se puede acceder en el try, se lanza un error
        // si sí se puede, se crea el directorio
        await fs.mkdir(path);
    }
};

const deletePhoto = async (photoName) => {
    try {
        // Creamos la ruta absoluta a la foto.
        const photoPath = path.join(__dirname, 'uploads', photoName);

        // Eliminamos la foto del disco.
        await fs.unlink(photoPath);
    } catch {
        throw new Error('Error al eliminar la imagen del servidor');
    }
};

module.exports = {
    generateError,
    createPathIfNotExists,
    deletePhoto,
};
