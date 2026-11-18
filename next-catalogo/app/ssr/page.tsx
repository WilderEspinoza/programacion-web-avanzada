export const dynamic = 'force-dynamic';
export default function SSRPage() {
    const instante = new Date().toLocaleString();

    return <main>
        <h1>SSR: Contenido dinámico</h1>
        <p>Esta pagina se prepara al momento de
             la solicitud del usuario</p>  
        <p>Hora actual del servidor: {instante}</p>
        <p>Descarga el juego en la play store de tu profesor</p>
    </main>;
}