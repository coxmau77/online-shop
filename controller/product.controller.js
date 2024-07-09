// /controller/product.controller.js


console.log("/product.controller.js");

const dataBase = require('../db/bd');

const createProduct = (request, response) => {
    const { sku, titulo, descripcion, precio } = request.body;

    // Validación de los datos del producto
    if (!sku || !titulo || !descripcion || !precio) {
        return response.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const SQL = 'INSERT INTO products (sku,titulo,descripcion,precio) VALUES (?,?,?,?)';

    dataBase.query(SQL, [sku, titulo, descripcion, precio], (error, result) => {

        if (error) throw error;

        response.json({
            message: "Producto creado con éxito",
            idProduct: result.insertId
        });
    });
};

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
};

const deleteProduct = (request, response) => {
    const { id } = request.params;
    const SQL = 'DELETE FROM products WHERE id = ?';

    dataBase.query(SQL, [id], (error, result) => {
        if (error) {
            return response.status(500).json({ mensaje: 'Error NO EXISTE el producto', error });
        }

        response.json({
            message: "EL productos se eliminó correctamente."
        });
    });
};

const uploadProduct = (request, response) => {
    const { id } = request.params;
    const { sku, titulo, descripcion, precio } = request.body;

    const SQL = 'UPDATE products SET sku = ?, titulo = ?, descripcion = ?, precio = ? WHERE id = ?';
    dataBase.query(SQL, [sku, titulo, descripcion, precio, id], (error, result) => {
        if (error) throw error;

        response.json({
            message: "Producto editado exitosamente!"
        });
    });
};

const searchProduct = (request, response) => {
    const query = request.query.query;
    console.log("const searchProduct >");
    const SQL = `SELECT * FROM products WHERE titulo LIKE ? OR sku = ?`;
    dataBase.query(SQL, [`%${query}%`, query], (error, result) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).json({ error: 'Error en el servidor' });
        }

        if (result.length === 0) {
            return response.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        response.json(result);
    });
};

module.exports = { getAll, deleteProduct, uploadProduct, createProduct, searchProduct }


