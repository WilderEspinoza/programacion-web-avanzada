require('dotenv').config();
const bcrypt = require('bcryptjs');

async function main() {
    const password = process.env.LAB_PASSWORD;
    if(!password) throw new Error("No se ha encontrado contraseña valida");
    const hash = await bcrypt.hash(password, 10);
    const correcta = await bcrypt.compare(password, hash);
    const incorrecta = await bcrypt.compare("1234", hash);
    console.log("Hash generado: ", hash.startsWith("$2"));
    console.log("Contraseña correcta: ", correcta);
    console.log("Contraseña incorrecta: ", incorrecta);
}
main().catch(err => {console.error(err.message); process.exitCode = 1;} );
