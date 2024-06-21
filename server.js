// servidor estatico en express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para analizar cuerpos de solicitud con formato JSON y datos URL codificados
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const userRoute = require('./routes/user.route');

// Middlewares
app.use(express.static('public'));
app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución  http://localhost:${PORT}`);
});