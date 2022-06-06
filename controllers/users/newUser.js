const insertUserQuery = require('../../db/userQueries/insertUserQuery');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
  try {
    // obtenemos los campos del body
    const { email, password } = req.body;

    // si faltan campos, error
    if (!email || !password) {
      throw generateError('Faltan campos', 400);
    }

    // creamos un usuario y obtenemos su id
    const idUser = await insertUserQuery(email, password);

    res.send({
      status: 'ok',
      message: `Usuario con id ${idUser} creado`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
