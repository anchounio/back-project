require('dotenv').config();

const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// pool de conexiones
let pool;

// función que devuelve una conexión libre
const getConnection = async () => {
  try {
    // si no hay grupo de conexiones, lo creamos
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: 'Z',
      });
    }
    // devolvemos una conexión libre
    return await pool.getConnection();
  } catch (err) {
    console.error(err);
  }
};

module.exports = getConnection;
