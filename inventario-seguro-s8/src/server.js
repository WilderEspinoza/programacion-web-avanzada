require('dotenv').config();
const app = require('./app');

const puerto = Number(process.env.PORT) || 3000;

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${puerto}`);
});