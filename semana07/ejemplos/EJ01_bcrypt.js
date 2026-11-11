require('dotenv').config();
const bcrypt = require('bcryptjs');

async function main() {
  const password = process.env.LAB_PASSWORD;
  if (!password) throw new Error('Configura LAB_PASSWORD en .env (solo valor ficticio)');
  const hash = await bcrypt.hash(password, 10);
  const correcta = await bcrypt.compare(password, hash);
  const incorrecta = await bcrypt.compare('otra-clave-ficticia', hash);
  console.log('Hash generado:', hash.startsWith('$2'));
  console.log('Contraseña correcta:', correcta);
  console.log('Contraseña diferente:', incorrecta);
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
