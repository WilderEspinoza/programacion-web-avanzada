const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verificarToken } = require('./middleware/autenticacion');
const { permitirRoles } = require('./middleware/roles');

async function crearApp() {
  const secreto = process.env.JWT_SECRET;
  if (!secreto || secreto.length < 48) throw new Error('JWT_SECRET faltante o demasiado corto');
  const app = express();
  app.use(express.json());
  const usuarios = [];
  let siguienteId = 1;

  if (process.env.DEMO_ADMIN_PASSWORD) {
    usuarios.push({
      id: siguienteId++, email: 'admin@ejemplo.test', rol: 'admin',
      hash: await bcrypt.hash(process.env.DEMO_ADMIN_PASSWORD, 10)
    });
  }

  app.get('/publico', (req, res) => res.json({ mensaje: 'Ruta pública disponible' }));

  app.post('/registro', async (req, res) => {
    const { email, password } = req.body || {};
    if (typeof email !== 'string' || !email.includes('@') ||
        typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ mensaje: 'Datos de registro inválidos' });
    }
    if (usuarios.some(u => u.email === email)) {
      return res.status(409).json({ mensaje: 'El correo ya existe' });
    }
    const usuario = {
      id: siguienteId++, email, rol: 'usuario',
      hash: await bcrypt.hash(password, 10)
    };
    usuarios.push(usuario);
    return res.status(201).json({ id: usuario.id, email: usuario.email, rol: usuario.rol });
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || typeof password !== 'string' ||
        !(await bcrypt.compare(password, usuario.hash))) {
      return res.status(401).json({ mensaje: 'Credenciales no válidas' });
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, secreto, {
      expiresIn: '1h', algorithm: 'HS256'
    });
    return res.json({ token, rol: usuario.rol });
  });

  app.get('/perfil', verificarToken, (req, res) => {
    res.json({ id: req.usuario.id, rol: req.usuario.rol });
  });

  app.get('/admin/dashboard', verificarToken, permitirRoles('admin'), (req, res) => {
    res.json({ mensaje: 'Panel administrativo permitido' });
  });

  return app;
}

module.exports = { crearApp };
