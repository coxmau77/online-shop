console.log(">>> user route executed :) <<<");
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.get('/', userController.getIndex);
router.get('/all', userController.getAll);
router.get('/profile', userController.getProfile);
router.get('/:id', userController.getUserID);
router.get('/:id', userController.getUserID);
router.get('/name:nombre', userController.getUserName);
router.post('/registro', userController.createUser);
router.put('/:id', userController.uploadUser);
router.delete('/:id', userController.deleteUser);

/** Recordar siempre exportar el modulo creado */
module.exports = router;

// // -----------------------------------<>---------------------------------- simulando un array de usuarios
// let users = [
//     { id: 1, nombre: "pepe", mail: "pepe@correo.com", favorite: ["a", "e", "i"], member: false, permiso: "user" },
//     { id: 2, nombre: "mony", mail: "mony@correo.com", favorite: ["x", "y", "z"], member: false, permiso: "user" },
//     { id: 3, nombre: "koqui", mail: "koqui@correo.com", favorite: ["a", "b", "c"], member: false, permiso: "user" },
//     { id: 4, nombre: "paulita", mail: "paulita@correo.com", favorite: ["1", "2", "3"], member: false, permiso: "user" },
//     { id: 5, nombre: "dardo", mail: "dardo@correo.com", favorite: ["i", "j", "s"], member: false, permiso: "user" },
//     { id: 6, nombre: "maría elena", mail: "maria_elena@correo.com", favorite: ["m", "t", "n"], member: false, permiso: "user" },
// ];

// // GET
// router.get('/', (request, response) => {
//     // response.send("Ruta funcionando")
//     // response.json({
//     //     message: "Ruta principal de http://localhost:3000/user"
//     // });
//     response.status(200).send({
//         message: "Ruta principal response.status(200).send() de http://localhost:3000/user",
//         user: "soy el usuario"
//     });
// });

// router.get('/all', (request, response) => {
//     // response.send("Ruta funcionando")
//     // response.json({
//     //     message: "Ver todos los usuarios de http://localhost:3000/user/all",
//     //     nombre: "Mauricio",
//     //     apellido: "Cox"
//     // });
//     response.json(users);
// });

// router.get("/profile", (request, response) => {
//     // Enviar un documento al cliente
//     // response.sendFile(path.join(__dirname, 'public', 'profile.html'));
//     console.log("profile executed");
//     response.status(200).send("Perfil de usuario profile.html >")
// });

// // QueryParams
// router.get('/:id', (request, response) => {

//     console.log(request.params);
//     const user = users.find(user => user.id === parseInt(request.params.id));

//     if (!user) return response.status(404).send(`El parametro "id: ${request.params.id}" no se encuentra`);

//     response.json(user);
// });

// router.get('/name/:nombre', (request, response) => {
//     console.log("ruta user id", request.params);
//     const userName = users.filter(user => user.nombre.toLowerCase() == request.params.nombre);

//     console.log(">>>", userName);
//     if (userName.length == 0) {

//         console.error(`error: El parametro "nombre: ${request.params.nombre}" no exíste`);

//         response.status(404).send(`El parametro "nombre: ${request.params.nombre}" no exíste`);
//     } else {
//         response.json(userName);
//     };


// });

// // POST Esta ruta maneja las solicitudes POST a / signup y debería imprimir el contenido del cuerpo de la solicitud en la consola.
// router.post('/signup', (request, response) => {

//     let { titulo, precioAR$ } = request.body;

//     // Captura y muestra la informacón del cuerpo de la solicitud en la consola (Backend)
//     console.info("Request, Requerir, Pedido, Solicitud todos son sinónimos para referirnos a lo mismo, obtengo la información que el cliente envía dentro del body >>> ", request.body);
//     console.log(titulo);
//     console.log(precioAR$);

//     // Envía una respuesta al cliente
//     // response.status(200).send(`>>>> REQUEST.BODY.TITULO ${titulo} >>>> REQUEST.BODY.PRECIO ${precio}`);

//     response.status(200).json(
//         {
//             message: "Registro e información JSON recibida",
//             data: request.body
//         }
//     );
// });

// router.post('/registro', (request, response) => {

//     console.log(request.body);
//     // Datos que necesitamos para dar de alta a un usuario
//     /*{ id: 1, nombre: "pepe", mail: "pepe@correo.com", favorite: ["a", "e", "i"], member: false, permiso: "user" }*/
//     const { nombre, mail } = request.body;

//     // const nuevoUsuario = {
//     //     id: users.length + 1,
//     //     nombre: nombre,
//     //     mail: mail
//     // }
//     const nuevoUsuario = {
//         id: users.length + 1,
//         nombre,
//         mail
//     }

//     users.push(nuevoUsuario);

//     response.status(201).json(nuevoUsuario);
// });

// // PUT
// router.put("/:id", (request, response) => {

//     const { nombre, mail } = request.body;

//     const user = users.find(user => user.id === parseInt(request.params.id));

//     if (!user) return response.status(404).send("No existe el usuario para editar");

//     user.nombre = nombre || user.nombre;
//     user.mail = mail || user.mail;

//     console.log(user);
//     response.json(user);
// });

// // DELETE
// router.delete("/:id", (request, response) => {

//     const userID = users.findIndex(user => user.id === parseInt(request.params.id));

//     if (userID < 0) {
//         return response.status(404).send("Usuario no encontrado");

//     } else {
//         const deletedUser = users.splice(userID, 1);

//         response.status(200).json(deletedUser);
//     }

// });