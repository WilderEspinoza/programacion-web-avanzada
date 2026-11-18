export const dynamic = 'force-static';

export const revalidate = 10; // Revalidar cada 10 segundos

export default function ISRPage() {
    const generado = new Date().toLocaleString();
    return <main>
        <h1>ISR: Contenido actualizable</h1>
        <p>Esta pagina se prepara al construir el proyecto con tu querido profesor</p>  
        <p>HTML Generado: {generado}</p>
        <p>Descarga el juego en la play store de tu profesor</p>
    </main>;
}