const { generateError } = require('../helpers');

const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.role);
        if (req.user.role !== 'admin') {
            throw generateError('No tienes suficientes permisos', 401);
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = isAdmin;
