const usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};


exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};