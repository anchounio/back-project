const getConnection = require('./getConnection');
const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando las tablas existentes...');

        await connection.query('DROP TABLE IF EXISTS exercisesUsers');
        await connection.query('DROP TABLE IF EXISTS exercises');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(40) UNIQUE NOT NULL,
                password VARCHAR(300) NOT NULL,
                role ENUM ("admin", "normal") DEFAULT "normal",
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE exercises (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                description VARCHAR(280) NOT NULL,
                photo VARCHAR(250),
                typology VARCHAR(40) NOT NULL,
                muscularGroup VARCHAR(40) NOT NULL,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE exercisesUsers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                idExercise INT NOT NULL,
                FOREIGN KEY (idExercise) REFERENCES exercises(id),
                likes BOOLEAN DEFAULT false,
                favourite BOOLEAN DEFAULT false,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tablas creadas');

        // Encriptamos una contraseña para el usuario administrador.
        const hashedPassword = await bcrypt.hash('1234', 10);

        // Creamos al usuario admin
        await connection.query(
            `
              INSERT INTO users (name, email, password, role)
              VALUES ("admin", "admin@gym.com", ?, "admin")`,
            [hashedPassword]
        );
        console.log('Usuario administrador creado...');
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
