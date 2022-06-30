const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const selectUserByEmailQuery = require('../../db/userQueries/selectUserByEmailQuery');
const selectUserByNameQuery = require('../../db/userQueries/selectUserByNameQuery');
const { generateError } = require('../../helpers');

const loginUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            throw generateError('Faltan campos', 400);
        }

        // obtenemos el usuario con el mail del body
        const user = await selectUserByNameQuery(name);

        // comprobamos que las contraseñas coinciden
        const validPassword = await bcrypt.compare(password, user.password);

        // si no coinciden, error
        if (!validPassword) {
            throw generateError('Contraseña incorrecta', 401);
        }

        // información que queremos guardar en el token
        const payload = {
            id: user.id,
            // role: user.role,
        };

        // firmamos el token
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '30d',
        });

        const role = user.role;

        res.send({
            status: 'ok',
            data: {
                token,
                role,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = loginUser;
