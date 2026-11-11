const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const encabezado = req.headers.authorization || '';
  const partes = encabezado.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer' || !partes[1]) {
    return res.status(401).json({ mensaje: 'Se requiere Bearer token' });
  }
  try {
    req.usuario = jwt.verify(partes[1], process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });
    return next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o vencido' });
  }
}
module.exports = { verificarToken };
