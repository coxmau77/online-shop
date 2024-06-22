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
        console.error("Error al conectar la BD >> ", error);
        return;
    }

    console.log("Conexión a la base de datos exitosa");
});

module.exports = connection