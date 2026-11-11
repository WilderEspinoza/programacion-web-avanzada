// T06 ↔ EJ06 — Examinar cabeceras CORS
// Objetivo: Simular origen permitido, uno ajeno y preflight OPTIONS, comparando cabeceras.
// Artefacto asociado: src/cors-config.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: Access-Control-Allow-Origin solo en origen permitido; OPTIONS 204.
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
  const uno = await fetch(base + '/publico', {
    headers: { Origin: 'http://localhost:4200' } });
  assert.equal(uno.headers.get('access-control-allow-origin'), 'http://localhost:4200');
  const dos = await fetch(base + '/publico', {
    headers: { Origin: 'http://sitiodesconocido.test' } });
  assert.equal(dos.headers.get('access-control-allow-origin'), null);
  const previo = await fetch(base + '/login', { method: 'OPTIONS', headers: {
    Origin: 'http://localhost:4200',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
  } });
  assert.equal(previo.status, 204);
  console.log('T06 PASS: CORS permitido, omitido, preflight 204');
 } finally { await cerrar(servidor); }
}
resolver().catch(e => { console.error(e); process.exitCode = 1; });
