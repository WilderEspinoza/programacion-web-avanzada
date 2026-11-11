export default function Saludo({nombre, curso}) {
    return (
        <section className="tarjeta">
            <h1>Hola, {nombre}!</h1>
            <p>Estás inscrito en el curso: {curso}</p>
        </section>
    );
}