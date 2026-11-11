import {useState} from "react";
import {IdiomaContexto} from "./IdiomaContexto";

export function IdiomaProvider({children}) {
    const [idioma, setIdioma] = useState("es");
    const cambiarIdioma = (nuevoIdioma) => setIdioma(nuevoIdioma);  
    return (
        <IdiomaContexto.Provider value={{idioma, cambiarIdioma}}>
            {children}
        </IdiomaContexto.Provider>
    );
}