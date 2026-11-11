import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));
app.use(express.json());

let usuarios = [
    { id: 1,nombre: "Juan"},
    { id: 2,nombre: "Diana"}
];

app.get("/api/usuarios", (req, res) => {
    res.json(usuarios);
});

app.get("/api/usuarios-mal", (req, res) => {
    res.json({error: "No es una lista"});
});

app.post("/api/usuarios", (req, res) => {
    const nombre = typeof req.body?.nombre === "string"  ? req.body.nombre.trim() : "";
    if(!nombre){
        return res.status(400).json({error: "El nombre es obligatorio"});
    }
    const nuevoUsuario = { id: usuarios.length + 1, nombre };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});


const correoDemo = "alumno@demo.test";
// SOLO laboratorio: esta clave de ejemplo es pública; nunca reutilizarla.
const claveHash = await bcrypt.hash("Demo1234!", 10);

app.post("/api/login", async (req, res) => {
  const correo = typeof req.body?.correo === "string"
    ? req.body.correo.trim().toLowerCase()
    : "";
  const clave = typeof req.body?.clave === "string" ? req.body.clave : "";
  const claveCorrecta = await bcrypt.compare(clave, claveHash);
  if (correo !== correoDemo || !claveCorrecta) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
  const token = jwt.sign(
    { sub: "usuario-demo", nombre: "Estudiante de prueba" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  res.json({ token });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});