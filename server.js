// console.info("Script que debe levantar un servidor");
// servidor estatico en express
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
    // Enviar un documento al cliente
    response.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecición  http://localhost:${PORT}`);
})