import axios from 'axios';
const url = 'http://localhost:4000/api/usuarios';

try{
    const respuesta = await axios.get(url);
    console.log(respuesta.data);
}catch(error){
    console.error("Fallo", error.response?.status ?? error.message);
}