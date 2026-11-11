// T02 ↔ EJ02 — Token de quince minutos
// Objetivo: Emitir un JWT ficticio de 15 minutos para id 25; verificarlo y rechazar uno manipulado.
// Artefacto asociado: ejemplos/EJ02_jwt.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: Claims válidos y rechazo de token manipulado, sin imprimir JWT.
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secreto = process.env.JWT_SECRET;
if (!secreto || secreto.length < 48) throw new Error('Completa JWT_SECRET');
const token = jwt.sign({ id: 25, rol: 'usuario' }, secreto, {
  expiresIn: '15m', algorithm: 'HS256'
});
const datos = jwt.verify(token, secreto, { algorithms: ['HS256'] });
console.log('T02 verificado:', datos.id === 25, datos.rol === 'usuario');
try { jwt.verify(token + 'x', secreto, { algorithms: ['HS256'] }); }
catch { console.log('T02 alteración rechazada'); }
