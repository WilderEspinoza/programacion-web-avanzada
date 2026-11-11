require('dotenv').config();
const jwt = require('jsonwebtoken');

const secreto = process.env.JWT_SECRET;
if (!secreto || secreto.length < 48) throw new Error('Configura JWT_SECRET (mínimo 48 caracteres)');
const token = jwt.sign({ id: 10, rol: 'usuario' }, secreto, {
  expiresIn: '1h', algorithm: 'HS256'
});
const usuario = jwt.verify(token, secreto, { algorithms: ['HS256'] });
console.log('Token validado:', usuario.id, usuario.rol);
try {
  jwt.verify(`${token}alterado`, secreto, { algorithms: ['HS256'] });
} catch (error) {
  console.log('Token alterado: rechazado');
}
