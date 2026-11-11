require('dotenv').config();
const { crearApp } = require('./crear-app');

async function iniciar() {
  const app = await crearApp();
  const puerto = Number(process.env.PORT || 3001);
  app.listen(puerto, () => console.log(`API de laboratorio: http://localhost:${puerto}`));
}
iniciar().catch(error => { console.error(error.message); process.exitCode = 1; });
