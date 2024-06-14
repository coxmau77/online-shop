console.log("user route executed :)");
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    // response.send("Ruta funcionando")
    response.json({
        message: "Ruta principal de http://localhost:3000/user"
    });
});

router.get('/all', (request, response) => {
    // response.send("Ruta funcionando")
    response.json({
        message: "Ver todos los usuarios de http://localhost:3000/user/all"
    });
});

module.exports = router;