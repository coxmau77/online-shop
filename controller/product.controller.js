const dataBase = require('../db/bd');

// createProduct
// getAllProducts
// editProduct
// deleteProduct

const getAll = (request, response) => {

    console.log("Ruta que muestra todos los productos");
    const SQL = 'SELECT * FROM products';

    dataBase.query(SQL, (error, result) => {

        // if (error) throw error;
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).json({ error: 'Error en el servidor' });
        }

        // if (result.length === 0) {
        //     console.log('No hay usuarios en la lista');
        //     return response.status(404).json({ mensaje: 'No existe ningún usuario aún' });
        // }

        response.json(result)
    });
}

module.exports = { getAll }