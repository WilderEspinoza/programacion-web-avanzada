import React, {lazy, Suspense} from 'react';

const Detalle = lazy(() => import('./Detalle'));

export default function App(){
    const [mostrar, setMostrar] = React.useState(false);
    const entorno = process.env.PUBLIC_APP_ENV;
    const api = process.env.PUBLIC_API_BASE_URL;
    return <main>
        <h1>Catalago preparado para producción</h1>
        <p>Producto: Teclado Gamer </p>
        <p>Entorno: {entorno}</p>   
        <p>API: {api}</p>
        <button onClick={() => setMostrar((anterior) => !anterior)}>
            {mostrar ? 'Ocultar ' : 'Mostrar '} detalle
        </button>
        {mostrar && (
            <Suspense fallback={<p>Cargando detalle...</p>}>
                <Detalle />
            </Suspense>
        )}
    </main>
}