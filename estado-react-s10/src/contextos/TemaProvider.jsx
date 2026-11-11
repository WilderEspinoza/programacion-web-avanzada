import {useState} from "react";
import {TemaContexto} from "./TemaConexto";

export function TemaProvider({children}) {
    const [temaOscuro, setTemaOscuro] = useState(false);
    
    const alternarTema = () => setTemaOscuro(actual => !actual);

    return (
        <TemaContexto.Provider value={{ temaOscuro, alternarTema }}>
            {children}
        </TemaContexto.Provider>
    );
}