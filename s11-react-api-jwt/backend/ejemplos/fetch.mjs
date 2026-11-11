const url = 'http://localhost:4000/api/usuarios';

try{
    const respuesta = await fetch(url);
    if(!respuesta.ok){
        throw new Error("Error en la petición");
    }
    const usuarios = await respuesta.json();
    console.log(usuarios);
}catch(error){
    console.error("No se pudo consultar:", error.message);
}