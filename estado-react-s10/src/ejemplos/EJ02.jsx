import {createContext, useContext} from "react";

const UsuarioContexto = createContext(null);

function Saludo(){
    const {nombre} = useContext(UsuarioContexto);
    return <h3>Bienvenido, {nombre}</h3>
}

function Tarjeta(){
    const {nombre} = useContext(UsuarioContexto);
    return (
        <p>
            Sesion de {nombre}
        </p>
    );
}

export default function EJ02() {
    
    return (
        <UsuarioContexto.Provider value={{ nombre: "Ana" }}>
            <Saludo />
            <Tarjeta />
        </UsuarioContexto.Provider>
    );  
}