const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const authUser = (req, res, next) => {
    try {
        // Obtenemos el token.
        console.log(req.headers.host);
        const { authorization } = req.headers;

        console.log(authorization);
        // Si no hay token lanzamos un error.
        if (!authorization) {
            throw generateError('Falta la cabecera de autorización', 401);
        }

        // Variable que contendrá la información del token (la parte del paylaod).
        let token;

        try {
            // Intentamos obtener la info del token. Le pasamos también el secreto con el
            // que se había creado el token.
            token = jwt.verify(authorization, process.env.SECRET);
        } catch {
            throw generateError('Token incorrecto', 401);
        }

        // Agregamos una nueva propiedad a la request.
        req.user = token;
        // El token tiene en su estructura la id y el rol.
        // Le habíamos metido esto previamente en el fichero loginUser.js
        // Al pasar el token entero dentro del request, ya lo tendremos entero
        // Si queremos acceder al rol: req.user.role

        // Importante usar este next. Pasamos el control a la siguiente función.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUser;
