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
const createUser = (request, response) => { }
const uploadUser = (request, response) => { }
const deleteUser = (request, response) => { }

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