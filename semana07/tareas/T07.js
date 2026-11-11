// T07 ↔ EJ07 — Prueba integral de seguridad
// Objetivo: Automatizar registro, duplicado, login fallido, login correcto, perfil, rol insuficiente y CORS.
// Artefacto asociado: pruebas/EJ07_flujo.test.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: Pruebas 201,409,401,200,403 y origen sin autorización CORS.
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
  assert.equal((await enviar(base, '/registro', usuario)).status, 409);
  const mala = await enviar(base, '/login', { ...usuario, password: 'incorrecta' });
  assert.equal(mala.status, 401);
  const buena = await enviar(base, '/login', usuario);
  assert.equal(buena.status, 200);
  const token = (await buena.json()).token;
  const privado = await fetch(base + '/perfil', { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(privado.status, 200);
  const admin = await fetch(base + '/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(admin.status, 403);
  const externo = await fetch(base + '/publico', { headers: { Origin: 'http://origen-invalido.test' } });
  assert.equal(externo.headers.get('access-control-allow-origin'), null);
  console.log('T07 PASS: registro, 409, 401, perfil, 403 y CORS');
 } finally { await cerrar(servidor); }
}
resolver().catch(e => { console.error(e); process.exitCode = 1; });
