import { useState } from "react";
import axios from "axios";

export default function LoginJWT() {
  const [correo, setCorreo] = useState("alumno@demo.test");
  const [clave, setClave] = useState("");
  const [token, setToken] = useState(""); // En memoria; no localStorage.
  const [perfil, setPerfil] = useState(null);
  const [mensaje, setMensaje] = useState("Primero inicia sesión");

  async function iniciar(evento) {
    evento.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/login", { correo, clave });
      setToken(data.token);
      setClave("");
      setMensaje("Login correcto. Ahora consulta el perfil.");
    } catch (error) {
      setMensaje(`Login rechazado: HTTP ${error.response?.status ?? "sin respuesta"}`);
    }
  }

  async function consultarPerfil() {
    try {
      const { data } = await axios.get("http://localhost:4000/api/perfil", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPerfil(data);
      setMensaje("Perfil autorizado: HTTP 200");
    } catch (error) {
      setPerfil(null);
      setMensaje(`Perfil rechazado: HTTP ${error.response?.status ?? "sin respuesta"}`);
    }
  }

  function cerrar() {
    setToken("");
    setPerfil(null);
    setMensaje("Sesión local cerrada. El JWT previo no queda revocado en el servidor.");
  }

  return (
    <section>
      <h2>EJ05 - JWT y perfil protegido</h2>
      <form onSubmit={iniciar}>
        <label>Correo: <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} /></label>
        <label>Clave de prueba: <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} /></label>
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={consultarPerfil}>Consultar perfil (Bearer)</button>
      <button onClick={cerrar}>Salir</button>
      <p role="status">{mensaje}</p>
      {perfil && <p>Hola, {perfil.nombre} (ID: {perfil.id})</p>}
    </section>
  );
}