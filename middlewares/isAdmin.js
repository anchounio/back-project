const { log } = require('sharp/lib/libvips');
const { generateError } = require('../helpers');

const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.role);
        if (req.user.role !== 'admin') {
            throw generateError('No tienes suficientes permisos', 401);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

module.exports = isAdmin;
