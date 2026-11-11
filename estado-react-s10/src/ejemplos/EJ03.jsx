import {useContext} from "react";
import {TemaContexto} from "../contextos/TemaConexto";
import {TemaProvider} from "../contextos/TemaProvider";

function BotonTema() {
    const {temaOscuro, alternarTema} = useContext(TemaContexto);
    return <button onClick={alternarTema}>Cambiar tema ({temaOscuro? 'OSCURO' : 'CLARO'})</button>
}

function PanelTema(){
    const {temaOscuro} = useContext(TemaContexto);
    return <div style={{backgroundColor: temaOscuro? 'black' : 'white', color: temaOscuro? 'white' : 'black'}}>
        <h3>Panel de Tema</h3>
        <p>El tema actual es {temaOscuro? 'OSCURO' : 'CLARO'}</p>
    </div>
}

export default function EJ03() {
    return <TemaProvider>
        <h2>Tema compartido</h2>
        <BotonTema />
        <PanelTema />
    </TemaProvider>
}