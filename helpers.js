const fs = require('fs/promises');

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

module.exports = {
  generateError,
  createPathIfNotExists,
};
