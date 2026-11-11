// T05 ↔ EJ05 — Contrastar permisos
// Objetivo: Comprobar que usuario obtiene 403 en dashboard y cuenta admin ficticia obtiene 200.
// Artefacto asociado: src/middleware/roles.js + src/crear-app.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: 403 para usuario y 200 para administrador de práctica.
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
  await enviar(base, '/registro', usuario);
  const login = await enviar(base, '/login', usuario);
  const tokenUsuario = (await login.json()).token;
  const prohibida = await fetch(base + '/admin/dashboard', {
    headers: { Authorization: `Bearer ${tokenUsuario}` }
  });
  assert.equal(prohibida.status, 403);
  if (!process.env.DEMO_ADMIN_PASSWORD) throw new Error('Configura DEMO_ADMIN_PASSWORD');
  const admin = await enviar(base, '/login', {
    email: 'admin@ejemplo.test', password: process.env.DEMO_ADMIN_PASSWORD
  });
  assert.equal(admin.status, 200);
  const tokenAdmin = (await admin.json()).token;
  const autorizada = await fetch(base + '/admin/dashboard', {
    headers: { Authorization: `Bearer ${tokenAdmin}` }
  });
  assert.equal(autorizada.status, 200);
  console.log('T05 PASS: usuario 403, admin 200');
 } finally { await cerrar(servidor); }
}
resolver().catch(e => { console.error(e); process.exitCode = 1; });
