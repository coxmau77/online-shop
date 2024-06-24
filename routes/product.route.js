const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).send("get index productos");
});

router.post('/', (request, response) => {
    response.status(200).send("post index productos");
});

const getAll = (request, response) => {

    console.log("Ruta que muestra todos los productos *");
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

module.exports = router;