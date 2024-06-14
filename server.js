// console.info("Script que debe levantar un servidor");
// servidor estatico en express
const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

// Router
const userRoute = require('./routes/user.route.js');

// // Configura el middleware para servir archivos estáticos
// // El contenido estático se servirá desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/user', userRoute);

app.get("/", (request, response) => {
    // Enviar un documento al cliente
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get("/", (request, response) => {
//     // Enviar un documento al cliente
//     response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

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

app.listen(PORT, () => {
    console.log(`Servidor en ejecición  http://localhost:${PORT}`);
})