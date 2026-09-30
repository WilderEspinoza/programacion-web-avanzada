const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de productos');
});

router.get('/:id', (req, res) => {
    const  id  = req.params.id;
    res.send(`Producto con ID: ${id}`);
}); 


module.exports = router;