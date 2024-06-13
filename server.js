// console.info("Script que debe levantar un servidor");
// servidor estatico en express
const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (request, response) => {
    // Esto se muestra al cliente
    response.send("Script que debe levantar un servidor");
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecición  http://localhost:${PORT}`);
})