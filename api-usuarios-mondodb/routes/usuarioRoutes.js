const express = require('express');
const router = express.Router();
const {crearUsuario, listarUsuarios} = require('../controllers/usuarioController');

router.post('/usuarios', crearUsuario);
router.get('/usuarios', listarUsuarios);

module.exports = router;