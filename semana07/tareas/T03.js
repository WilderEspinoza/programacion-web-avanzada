// T03 ↔ EJ03 — Registro sin escalamiento de rol
// Objetivo: Enviar registro solicitando rol admin y demostrar que el servidor crea usuario; repetir email y observar 409.
// Artefacto asociado: src/crear-app.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: 201 con rol usuario, sin hash, y 409 para correo duplicado.
require('dotenv').config();
const assert = require('node:assert/strict');
const { randomBytes } = require('node:crypto');
const { crearApp } = require('../src/crear-app');
async function arrancar() {
  const app = await crearApp();
  const servidor = app.listen(0);
  await new Promise(resolve => servidor.once('listening', resolve));
  return { servidor, base: `http://127.0.0.1:${servidor.address().port}` };
}
async function cerrar(servidor) {
  await new Promise((resolve, reject) => servidor.close(err => err ? reject(err) : resolve()));
}
async function enviar(base, ruta, cuerpo) {
  return fetch(base + ruta, { method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo) });
}
function datosAleatorios() {
  return { email: `alumno_${randomBytes(5).toString('hex')}@ejemplo.test`,
    password: randomBytes(20).toString('base64url') };
}

async function resolver() {
 const { servidor, base } = await arrancar();
 try {
  const usuario = datosAleatorios();
  const uno = await enviar(base, '/registro', { ...usuario, rol: 'admin' });
  assert.equal(uno.status, 201);
  const recibido = await uno.json();
  assert.equal(recibido.rol, 'usuario');
  assert.equal('hash' in recibido, false);
  const duplicado = await enviar(base, '/registro', usuario);
  assert.equal(duplicado.status, 409);
  console.log('T03 PASS: rol seguro y duplicado rechazado');
 } finally { await cerrar(servidor); }
}
resolver().catch(e => { console.error(e); process.exitCode = 1; });
