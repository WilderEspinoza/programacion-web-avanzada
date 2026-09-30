const express = require('express');
const app = express();
const productosRouter = require('./routes/productos');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get('/error-demo', (req, res, next) => {
    next(new Error('Error de demostración'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

app.use('/productos', productosRouter);

app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001 http://localhost:3001 ');
});
