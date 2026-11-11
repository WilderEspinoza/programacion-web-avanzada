import { useState } from "react";

export default function Contador() {    
    const [contador, setContador] = useState(0);

    const incrementar = () => setContador(contador + 1);
    const reiniciar = () => setContador(0);
    const decrementar = () => setContador(actual => Math.max(0, actual - 1));
   


    return (
        <section className="tarjeta">
            <h1>Contador: {contador}</h1>
            <button onClick={incrementar}>Incrementar</button>
            <button onClick={reiniciar}>Reiniciar</button>
            <button onClick={decrementar}>Decrementar</button>
        </section>
    );
}