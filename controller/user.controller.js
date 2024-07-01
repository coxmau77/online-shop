const dataBase = require('../db/bd');

const getAll = (request, response) => {

    console.log("Ruta que muestra todos los usuarios");
    const SQL = 'SELECT * FROM usuarios';

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

const getIndex = (request, response) => {
    response.status(200).send("Ruta user/index");
}

const getProfile = (request, response) => { }

const getUserID = (request, response) => {

    const { id } = request.params;
    const SQL = 'SELECT * FROM usuarios WHERE id = ?';

    dataBase.query(SQL, [id], (error, result) => {

        if (error) throw error;
        response.json(result)
    });
};

const getUserName = (request, response) => { }

const createUser = (request, response) => {

    const { nombre, apellido, mail } = request.body;

    // Validación básica de entrada
    // if (!nombre || !apellido || !mail) {
    //     return response.status(400).json({ message: 'Todos los campos son requeridos.' });
    // }

    // // Convertir el campo 'favorite' a JSON
    // const favoriteJSON = JSON.stringify(favorite);

    const SQL = 'INSERT INTO users (nombre, apellido, mail) VALUES (?,?,?)';

    dataBase.query(SQL, [nombre, apellido, mail], (error, result) => {

        if (error) throw error;
        // if (error) {
        //     return response.status(500).json({ message: 'Error al crear el usuario', error });
        // }

        response.json({
            message: "Usuario creado con éxito",
            idUsuario: result.insertId
        });
    });
}

const uploadUser = (request, response) => {
    const { id } = request.params;
    const { nombre, apellido, mail } = request.body;

    // // Convertir el campo 'favorite' a JSON
    // const favoriteJSON = JSON.stringify(favorite);

    const SQL = 'UPDATE usuarios SET nombre = ?, apellido = ?, mail = ? WHERE id = ?';

    dataBase.query(SQL, [nombre, apellido, mail, id], (error, result) => {

        if (error) throw error;
        // if (error) {
        //     return response.status(500).json({ message: 'Error al editar el usuario', error });
        // }

        response.json({
            message: "Usuario EDITADO con éxito"
        })

    });
}

const deleteUser = (request, response) => {
    const { id } = request.params;
    const SQL = 'DELETE FROM usuarios WHERE id = ?';

    dataBase.query(SQL, [id], (error, result) => {

        if (error) throw error;
        // if (error) {
        //     return response.status(500).json({ mensaje: 'Error NO EXISTE el usuario', error });
        // }

        response.json({
            message: "Confirma el borrado del usuario?"
        })

    })
}

module.exports = {
    getAll,
    getIndex,
    getProfile,
    getUserID,
    getUserName,
    createUser,
    uploadUser,
    deleteUser
}