import Saludo from './components/Saludo.jsx';
import Contador from './components/Contador.jsx';

export default function App() {
    const nombre = 'Mario Fernadez';
    return (
        <main className="contenedor">
            <h1>Portal de cursos</h1>
            <p>Bienvenido, {nombre}!</p>
            <p>Aprenderemos REACT con JSX</p>

            <Saludo nombre={nombre} curso="React Avanzado" />
            <Saludo nombre="Juan Perez" curso="React Basico" />
            <Contador />
        </main>
  );
}