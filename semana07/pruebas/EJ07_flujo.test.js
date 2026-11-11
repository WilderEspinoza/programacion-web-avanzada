require('dotenv').config();
const { randomBytes } = require('node:crypto');
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { crearApp } = require('../src/crear-app');

let servidor, base, tokenUsuario;
const email = `alumno_${randomBytes(5).toString('hex')}@ejemplo.test`;
const password = randomBytes(18).toString('base64url');

before(async () => {
  const app = await crearApp();
  servidor = app.listen(0);
  await new Promise(resolve => servidor.once('listening', resolve));
  base = `http://127.0.0.1:${servidor.address().port}`;
});
after(async () => {
  if (servidor) await new Promise((resolve, reject) => servidor.close(err => err ? reject(err) : resolve()));
});

test('EJ07 H1: ruta pública y registro con rol asignado por servidor', async () => {
  const publica = await fetch(`${base}/publico`);
  assert.equal(publica.status, 200);
  const registro = await fetch(`${base}/registro`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, rol: 'admin' })
  });
  assert.equal(registro.status, 201);
  const datos = await registro.json();
  assert.equal(datos.rol, 'usuario');
  assert.equal('hash' in datos, false);
});

test('EJ07 H2: login y ruta privada', async () => {
  const login = await fetch(`${base}/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  assert.equal(login.status, 200);
  tokenUsuario = (await login.json()).token;
  assert.ok(tokenUsuario);
  const sinToken = await fetch(`${base}/perfil`);
  assert.equal(sinToken.status, 401);
  const perfil = await fetch(`${base}/perfil`, { headers: { Authorization: `Bearer ${tokenUsuario}` } });
  assert.equal(perfil.status, 200);
  assert.equal((await perfil.json()).rol, 'usuario');
});

test('EJ07 H3: autorización y token inválido', async () => {
  const sinRol = await fetch(`${base}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${tokenUsuario}` }
  });
  assert.equal(sinRol.status, 403);
  const alterado = await fetch(`${base}/perfil`, {
    headers: { Authorization: `Bearer ${tokenUsuario}alterado` }
  });
  assert.equal(alterado.status, 401);
});

test('EJ07 H4: CORS permitidos, no permitidos y preflight', async () => {
  const permitido = await fetch(`${base}/publico`, { headers: { Origin: 'http://localhost:4200' } });
  assert.equal(permitido.headers.get('access-control-allow-origin'), 'http://localhost:4200');
  const otro = await fetch(`${base}/publico`, { headers: { Origin: 'http://otro.ejemplo.test' } });
  assert.equal(otro.headers.get('access-control-allow-origin'), null);
  const previo = await fetch(`${base}/login`, {
    method: 'OPTIONS', headers: {
      Origin: 'http://localhost:4200',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    }
  });
  assert.equal(previo.status, 204);
  assert.equal(previo.headers.get('access-control-allow-origin'), 'http://localhost:4200');
});
