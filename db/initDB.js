const getConnection = require('./getConnection');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Borrando las tablas existentes...');

    console.log('Creando tablas...');

    await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                email VARCHAR(40) UNIQUE NOT NULL,
                password VARCHAR(20) NOT NULL,
                role ENUM ("admin", "normal") DEFAULT "normal",
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await connection.query(`
            CREATE TABLE exercises (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                description VARCHAR(40) NOT NULL,
                photo VARCHAR(250),
                typology VARCHAR(40) NOT NULL,
                muscularGroup VARCHAR(40) NOT NULL,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    await connection.query(`
            CREATE TABLE exercisesUsers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsers INT NOT NULL,
                FOREIGN KEY (idUsers) REFERENCES users(id),
                idExercises INT NOT NULL,
                FOREIGN KEY (idExercises) REFERENCES exercises(id),
                likes INT,
                createAt DATETIME DEFAULT CURRENT_TIMESTAMP

            )
        `);

    console.log('Tablas creadas');

    await connection.query(`
              INSERT INTO users (name, email, password, role)
              VALUES ("admin", "admin@gym.com", "1234", "admin")
        `);
    console.log('Usuario administrador creado...');
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
