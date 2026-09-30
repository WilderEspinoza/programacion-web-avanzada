const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Listado de usuarios');
});


router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Detalle del usuarios con id: ${id}`);
});

module.exports = router;