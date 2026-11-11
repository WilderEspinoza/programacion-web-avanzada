require('dotenv').config();
const jwt = require('jsonwebtoken');
const secreto = process.env.JWT_SECRET;
if(!secreto || secreto.length < 48) throw new Error("Configurar JWT_SECRET con minimo 48 caracteres");

const token = jwt.sign({id: 10, rol: 'usuario'}, secreto, {expiresIn: '15m', algorithm: 'HS256'});

/**
 * 30 segundos => '30s'
 * 5 minutos => '5m'
 * 2 horas => '2h'
 * 7 dias => '7d'
 * 1 año => '1y'
 */

const usuario = jwt.verify(token, secreto, {algorithms: ['HS256']});
console.log('Token valido: ', usuario.id, usuario.rol);

try{
    jwt.verify(`${token}alterado`, secreto, {algorithms: ['HS256']});
}catch(e){
    console.error("Token inválido");    
}