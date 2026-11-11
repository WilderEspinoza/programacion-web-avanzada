// T01 ↔ EJ01 — Comprobar un hash y reconocer comparación fallida
// Objetivo: Modificar un script para verificar una clave ficticia correcta y otra incorrecta.
// Artefacto asociado: ejemplos/EJ01_bcrypt.js
// Antes de ejecutar, predice el estado, el código HTTP o los booleanos.
// Evidencia esperada: Dos salidas booleanas diferentes; no mostrar el valor original.
require('dotenv').config();
const bcrypt = require('bcryptjs');
async function resolver() {
  const password = process.env.LAB_PASSWORD;
  if (!password) throw new Error('Configura LAB_PASSWORD de laboratorio');
  const hash = await bcrypt.hash(password, 10);
  console.log('Clave correcta:', await bcrypt.compare(password, hash));
  console.log('Clave incorrecta:', await bcrypt.compare('otra_clave_demo', hash));
  console.log('Hash diferente de texto original:', hash !== password);
}
resolver().catch(e => { console.error(e.message); process.exitCode = 1; });
