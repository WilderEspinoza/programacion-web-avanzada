require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send({estado: 'ok'});
});

app.use('/api', usuarioRoutes);

async function IniciarServidor() {
    try {   
        await connectDB();  
        const PORT = process.env.PORT || 3001;
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
        });

    }catch(error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

IniciarServidor();

