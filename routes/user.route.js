console.log(">>> user route executed :) <<<");
const express = require('express');
const router = express.Router();

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

// Esta ruta maneja las solicitudes POST a / signup y debería imprimir el contenido del cuerpo de la solicitud en la consola.
router.post("/signup", (request, response) => {

    let { titulo, precio } = request.body;

    // Captura y muestra la informacón del cuerpo de la solicitud en la consola (Backend)
    console.info("Request, Requerir, Pedido, Solicitud todos son sinónimos para referirnos a lo mismo, obtengo la información que el cliente envía dentro del body >>> ", request.body);

    // Envía una respuesta al cliente
    // response.status(200).send(`>>>> REQUEST.BODY.TITULO ${titulo} >>>> REQUEST.BODY.PRECIO ${precio}`);

    response.status(200).json(
        {
            message: "Registro e información JSON recibida",
            data: request.body
        }
    );
});

// app.get("/contact", (request, response) => {
//     // Enviar un documento al cliente
//     response.sendFile(path.join(__dirname, 'public', 'contact.html'));
// });

// app.get("/signup", (request, response) => {
//     // Enviar un documento al cliente
//     response.sendFile(path.join(__dirname, 'public', 'signup.html'));
// });

// app.post("/signup", (request, response) => {
//     // Enviar un documento al cliente
//     response.send("Se envia en el body los datos del form a una BD");
// });

module.exports = router;