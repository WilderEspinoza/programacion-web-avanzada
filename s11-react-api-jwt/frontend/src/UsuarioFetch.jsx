import {useState} from 'react';
export default function UsuarioFetch() {
    const [usuarios, setUsuario] = useState([]);
    const [mensaje, setMensaje] = useState("Pulsa consulta para comenzar");
    async function consultaUsuarios() {
        setMensaje("Cargando...");
        try {
            const respuesta = await fetch("http://localhost:4000/api/usuarios");
            if(!respuesta.ok){
                throw new Error("Error en la petición");
            }
            const data = await respuesta.json();
            setUsuario(data);
            setMensaje("Consulta realizada correctamente");
        }catch (error) {
            setUsuario([]);
            console.error("No se pudo consultar:", error.message);
        }
    }

    async function agregarUsuario(evento) {
        evento.preventDefault();
        try {
            const respuesta = await fetch("http://localhost:4000/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre: evento.target.nombre.value.trim() })
            });
            if(!respuesta.ok){
                throw new Error("Error en la petición");
            }
            const data = await respuesta.json();
            setUsuario(prevUsuarios => [...prevUsuarios, data]);
            setMensaje("Usuario agregado correctamente");
        }catch (error) {
            console.error("No se pudo agregar:", error.message);
        }
    }
    return (
        <section>
            <h2>Consulta de usuarios</h2>
            <button onClick={consultaUsuarios}>Consulta</button>
            <form onSubmit={agregarUsuario}>
                <input type="text" name="nombre" placeholder="Nombre del usuario" required />
                <button type="submit">Agregar Usuario</button>
            </form>
            <p>{mensaje}</p>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        <strong>{usuario.nombre}</strong>
                    </li>
                ))}
            </ul>
        </section>
    );

}