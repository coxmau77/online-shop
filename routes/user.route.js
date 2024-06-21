console.log(">>> user route executed :) <<<");
const express = require('express');
const router = express.Router();

// GET
router.get('/', (request, response) => {
    // response.send("Ruta funcionando")
    // response.json({
    //     message: "Ruta principal de http://localhost:3000/user"
    // });
    response.status(200).send({
        message: "Ruta principal response.status(200).send() de http://localhost:3000/user",
        user: "soy el usuario"
    });
});

router.get('/all', (request, response) => {
    // response.send("Ruta funcionando")
    response.json({
        message: "Ver todos los usuarios de http://localhost:3000/user/all",
        nombre: "Mauricio",
        apellido: "Cox"
    });
});

router.get("/profile", (request, response) => {
    // Enviar un documento al cliente
    // response.sendFile(path.join(__dirname, 'public', 'profile.html'));
    response.status(200).send("Perfil de usuario profile.html >")
});

// POST Esta ruta maneja las solicitudes POST a / signup y debería imprimir el contenido del cuerpo de la solicitud en la consola.
router.post("/signup", (request, response) => {

    let { titulo, precioAR$ } = request.body;

    // Captura y muestra la informacón del cuerpo de la solicitud en la consola (Backend)
    console.info("Request, Requerir, Pedido, Solicitud todos son sinónimos para referirnos a lo mismo, obtengo la información que el cliente envía dentro del body >>> ", request.body);
    console.log(titulo);
    console.log(precioAR$);

    // Envía una respuesta al cliente
    // response.status(200).send(`>>>> REQUEST.BODY.TITULO ${titulo} >>>> REQUEST.BODY.PRECIO ${precio}`);

    response.status(200).json(
        {
            message: "Registro e información JSON recibida",
            data: request.body
        }
    );
});

// PUT


// DELETE

/** Recordar siempre exportar el modulo creado */
module.exports = router;