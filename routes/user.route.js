console.log(">>> user route executed :) <<<");
const express = require('express');
const router = express.Router();

// simulando un array de usuarios
let users = [
    { id: 1, nombre: "pepe", mail: "pepe@correo.com", favorite: ["a", "e", "i"], member: false, permiso: "user" },
    { id: 2, nombre: "mony", mail: "mony@correo.com", favorite: ["x", "y", "z"], member: false, permiso: "user" },
    { id: 3, nombre: "koqui", mail: "koqui@correo.com", favorite: ["a", "b", "c"], member: false, permiso: "user" },
    { id: 4, nombre: "paulita", mail: "paulita@correo.com", favorite: ["1", "2", "3"], member: false, permiso: "user" },
    { id: 5, nombre: "dardo", mail: "dardo@correo.com", favorite: ["i", "j", "s"], member: false, permiso: "user" },
    { id: 5, nombre: "maría elena", mail: "maria_elena@correo.com", favorite: ["m", "t", "n"], member: false, permiso: "user" },
];

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
    // response.json({
    //     message: "Ver todos los usuarios de http://localhost:3000/user/all",
    //     nombre: "Mauricio",
    //     apellido: "Cox"
    // });
    response.json(users);
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