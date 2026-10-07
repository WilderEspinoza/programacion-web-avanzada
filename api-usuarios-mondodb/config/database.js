const mongoose = require('mongoose');

async function connectDB() {

    if(!process.env.MONGO_URI) { 
        throw new Error('MONGO_URI no está definido en las variables de entorno');
    }  

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la base de datos MongoDB');
}  

module.exports = connectDB;