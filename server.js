// console.info("Script que debe levantar un servidor");
// servidor estatico en express
const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

// Configura el middleware para servir archivos estáticos
// El contenido estático se servirá desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (request, response) => {
    // Enviar un documento al cliente
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecición  http://localhost:${PORT}`);
})