const dataBase = require('../db/bd');

const userValidate = (request, response) => {

    const { mail } = request.body;

    const SQL = 'SELECT * FROM users WHERE mail = ?';

    // Realizar consulta a la base de datos
    dataBase.query(SQL, [mail], (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return response.status(500).json({ message: 'Error en la base de datos' });
        }

        // Verificar si se encontraron resultados
        if (results.length > 0) {
            const user = results[0];
            response.json({ exists: true, userName: user.nombre });
        } else {
            response.json({ exists: false });
        }
    });
};

module.exports = { userValidate };