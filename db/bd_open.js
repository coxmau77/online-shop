// Código para Mantener la Conexión Abierta
require('dotenv').config();
const mysql = require('mysql2');

// Configuración de la conexión local
const localConfig = {
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "online_shop",
    port: 3303
};

// Configuración de la conexión para despliegue
const deployConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// Seleccionar la configuración correcta (local o despliegue)
const config = process.env.NODE_ENV === 'production' ? deployConfig : localConfig;

// Crear la conexión con la configuración seleccionada
const connection = mysql.createConnection(config);

// Función para ejecutar consultas SQL con manejo de errores
function executeQuery(query, successMessage) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.error(`Error ejecutando la consulta: ${query}`, error);
                return reject(error);
            }
            console.log(successMessage);
            resolve(results);
        });
    });
}

// Configuración de la base de datos y las tablas
async function setupDatabase() {
    try {
        // Conectar a la base de datos
        connection.connect((error) => {
            if (error) {
                console.error("Error al conectar a la base de datos >> ", error);
                return;
            }
            console.log("Conexión a la base de datos exitosa");
        });

        // Crear la base de datos si no existe
        await executeQuery('CREATE DATABASE IF NOT EXISTS online_shop', 'Base de datos verificada');

        // Cambiar a la base de datos online_shop
        connection.changeUser({ database: 'online_shop' }, async (error) => {
            if (error) {
                console.error("Error al cambiar a la base de datos online_shop", error);
                return;
            }

            // Consultas para crear las tablas
            const createTableQueries = [
                {
                    query: `
                        CREATE TABLE IF NOT EXISTS users (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL,
                            apellido VARCHAR(100) NOT NULL,
                            mail VARCHAR(255) NOT NULL
                        );
                    `,
                    message: 'Tabla users lista para usar'
                },
                {
                    query: `
                        CREATE TABLE IF NOT EXISTS products (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            sku VARCHAR(255) NOT NULL,
                            titulo VARCHAR(100) NOT NULL,
                            descripcion VARCHAR(255) NOT NULL,
                            precio INT NOT NULL
                        );
                    `,
                    message: 'Tabla products lista para usar'
                }
            ];

            // Ejecutar las consultas de creación de tablas
            for (const { query, message } of createTableQueries) {
                await executeQuery(query, message);
            }

            // No cerrar la conexión aquí, se mantiene abierta para operaciones posteriores
        });
    } catch (error) {
        console.error('Error en la configuración de la base de datos:', error);
    }
}

// Ejecutar la configuración de la base de datos
setupDatabase();

module.exports = connection;
