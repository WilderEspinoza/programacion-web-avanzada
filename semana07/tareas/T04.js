// T04 ↔ EJ04 — Verificar la ruta privada
// Objetivo: Solicitar /perfil sin credencial y luego con Bearer token válido.
// Artefacto asociado: src/middleware/autenticacion.js + src/crear-app.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: 401 sin token; 200 con token; no incluye contraseña.
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
  assert.equal((await enviar(base, '/registro', usuario)).status, 201);
  const login = await enviar(base, '/login', usuario);
  assert.equal(login.status, 200);
  const token = (await login.json()).token;
  assert.equal((await fetch(base + '/perfil')).status, 401);
  const perfil = await fetch(base + '/perfil', {
    headers: { Authorization: `Bearer ${token}` } });
  assert.equal(perfil.status, 200);
  assert.equal((await perfil.json()).rol, 'usuario');
  console.log('T04 PASS: 401 sin token y 200 con Bearer válido');
 } finally { await cerrar(servidor); }
}
resolver().catch(e => { console.error(e); process.exitCode = 1; });
