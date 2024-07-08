// Código para Usar un Pool de Conexiones
require('dotenv').config();
const mysql = require('mysql2/promise'); // Usar la versión promise para mayor simplicidad

// Configuración de la conexión local
const localConfig = {
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "online_shop",
    port: 3303,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Configuración de la conexión para despliegue
const deployConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Seleccionar la configuración correcta (local o despliegue)
const config = process.env.NODE_ENV === 'production' ? deployConfig : localConfig;

// Crear el pool de conexiones con la configuración seleccionada
const connection = mysql.createconnection(config);

// Función para ejecutar consultas SQL con manejo de errores
async function executeQuery(query, successMessage) {
    try {
        const [results] = await connection.query(query);
        console.log(successMessage);
        return results;
    } catch (error) {
        console.error(`Error ejecutando la consulta: ${query}`, error);
        throw error;
    }
}

// Configuración de la base de datos y las tablas
async function setupDatabase() {
    try {
        // Crear la base de datos si no existe
        await executeQuery('CREATE DATABASE IF NOT EXISTS online_shop', 'Base de datos verificada');

        // Cambiar a la base de datos online_shop
        await connection.query('USE online_shop');

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
    } catch (error) {
        console.error('Error en la configuración de la base de datos:', error);
    }
}

// Ejecutar la configuración de la base de datos
setupDatabase();

module.exports = connection;
