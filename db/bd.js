const mySQL = require('mysql2');

const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "usuarios_db",
    port: 3303
});

connection.connect(error => {
    if (error) {
        console.error("error al conectar la BD >> ", error);
        return;
    }

    console.log("Conexión a la base de datos exitosa");

    connection.query(`CREATE DATABASE IF NOT EXISTS usuarios_db`, (error, results) => {
        if (error) {
            console.log("error creando la base de datos");
            return;
        }

        console.log("Base de datos asegurada");

        connection.changeUser({ database: 'usuarios_db' }, (error) => {
            if (error) {
                console.error("erroror al cambiar a usuarios_db", error);
                return;
            }

            const createTableQuery = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    apellido VARCHAR(100) NOT NULL,
                    mail VARCHAR(255) NOT NULL
                );            
            `;

            connection.query(createTableQuery, (error, results) => {
                if (error) {
                    console.log("error creando la tabla: ", error);
                    return;
                }


                console.log("Tabla asegurada");
            });
        });
    });
});

module.exports = connection