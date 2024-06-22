const dataBase = require('../db/bd');

const getAll = (request, response) => {

    console.log("Ruta que muestra todos los usuarios");
    const SQL = 'SELECT * FROM usuarios';

    dataBase.query(SQL, (error, result) => {

        if (error) throw error;


        if (result.length === 0) {
            console.log(result.length);
            response.status(404).send("No existe ningun usuario aun")
        } else {
            response.json(result)
        }
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
    // nombre, mail, favorite, member, permiso
    // 'pepe', 'pepe@correo.com', '["a", "e", "i"]', FALSE, 'user'
    const { nombre, mail, favorite, member, permiso } = request.body;

    // Validación básica de entrada
    if (!nombre || !mail || !favorite || typeof member === 'undefined' || !permiso) {
        return response.status(400).json({ mensaje: 'Todos los campos son requeridos.' });
    }

    // Convertir el campo 'favorite' a JSON
    const favoriteJSON = JSON.stringify(favorite);

    const SQL = 'INSERT INTO usuarios (nombre, mail, favorite, member, permiso) VALUES (?,?,?,?,?)';

    dataBase.query(SQL, [nombre, mail, favoriteJSON, member, permiso], (error, result) => {

        if (error) {
            return response.status(500).json({ mensaje: 'Error al crear el usuario', error });
        }

        response.json({
            mensaje: "Usuario creado con éxito",
            idUsuario: result.insertId
        });
    });

}

const uploadUser = (request, response) => {
    const { id } = request.params;
    const { mail, favorite } = request.body;

    // Convertir el campo 'favorite' a JSON
    const favoriteJSON = JSON.stringify(favorite);

    const SQL = 'UPDATE usuarios SET mail = ?, favorite = ? WHERE id = ?';

    dataBase.query(SQL, [mail, favoriteJSON, id], (error, result) => {

        if (error) {
            return response.status(500).json({ mensaje: 'Error al editar el usuario', error });
        }

        response.json({
            mensaje: "Usuario EDITADO con éxito"
        })

    });
}

const deleteUser = (request, response) => {

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