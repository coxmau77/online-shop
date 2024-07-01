const mySQL = require('mysql2');

const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "online_shop",
    port: 3303
});

connection.connect(error => {
    if (error) {
        console.error("error al conectar la BD >> ", error);
        return;
    }

    console.log("Conexión a la base de datos exitosa");

    connection.query(`CREATE DATABASE IF NOT EXISTS online_shop`, (error, results) => {
        if (error) {
            console.log("error creando la base de datos");
            return;
        }

        console.log("Base de datos verificada");

        connection.changeUser({ database: 'online_shop' }, (error) => {
            if (error) {
                console.error("erroror al cambiar a online_shop", error);
                return;
            }

            const createTableQueryUsers = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(100) NOT NULL,
                    apellido VARCHAR(100) NOT NULL,
                    mail VARCHAR(255) NOT NULL
                );    
               
            `;

            const createTableQueryProducts = `
                 CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    sku VARCHAR(255) NOT NULL,
                    titulo VARCHAR(100) NOT NULL,
                    descripcion VARCHAR(255) NOT NULL,
                    precio INT NOT NULL
                );
            `;

            connection.query(createTableQueryUsers, (error, results) => {
                if (error) {
                    console.log("error creando la tabla: ", error);
                    return;
                }
                console.log("Tabla users lista para usar");
            });

            connection.query(createTableQueryProducts, (error, results) => {
                if (error) {
                    console.log("error creando la tabla: ", error);
                    return;
                }
                console.log("Tabla products lista para usar");
            });
        });
    });
});

module.exports = connection