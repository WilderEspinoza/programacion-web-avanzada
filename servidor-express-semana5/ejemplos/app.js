const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/productos', (req, res) => {
    const data = fs.readFileSync('./productos.json', 'utf-8');
    const productos = JSON.parse(data);
    res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    const data = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));
    data.push(nuevoProducto);
    fs.writeFileSync('./productos.json', JSON.stringify(data, null, 2));
    res.status(201).send('Producto agregado correctamente');
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nuevoProducto = req.body;
    let data = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));
    data = data.map(producto => producto.id === id ? { ...producto, ...nuevoProducto } : producto);
    fs.writeFileSync('./productos.json', JSON.stringify(data, null, 2));
    res.send('Producto actualizado correctamente');
});


app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001 http://localhost:3001 ');
});
