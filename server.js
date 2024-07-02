// servidor estatico en express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('node:path');

// Middleware para analizar cuerpos de solicitud con formato JSON y datos URL codificados para el formulario.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const loginRoutes = require('./routes/login.routes');

// Middlewares
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/api', loginRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor en ejecución  http://localhost:${PORT}`);
});