import { useContext } from "react";
import { IdiomaContexto } from "../contextos/IdiomaContexto";
import { IdiomaProvider } from "../contextos/IdiomaProvider";

function SaludoIdioma(){
    const {idioma} = useContext(IdiomaContexto);
    return (
        <div>
            {idioma === "es" ? "Hola querido profesor, el idioma es español" : "Hello, the language is English"}
        </div>
    );
}

function CambiarIdioma(){
    const { cambiarIdioma} = useContext(IdiomaContexto);
    return (
        <div>
            <button onClick={() => cambiarIdioma("es")}>Cambiar a Español</button>
            <button onClick={() => cambiarIdioma("en")}>Change to English</button>
        </div>
    );
}

export default function EJ04() {
    return (
        <IdiomaProvider>
            <h3>Ejemplo 04: Context API</h3>
            <SaludoIdioma></SaludoIdioma>
            <CambiarIdioma></CambiarIdioma>
        </IdiomaProvider>
    );
}