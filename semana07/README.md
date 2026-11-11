# Programación Web Avanzada — S07

Repositorio de práctica: JWT, bcrypt.js, CORS y autorización por roles. Todo usa cuentas ficticias y una colección **solo en memoria**. No almacenar información personal.

## Preparación inicial y orden explicado

**Este proyecto YA trae todos los scripts definidos en `package.json` porque el código está listo. No vuelvas a crear los alias ni reemplaces el archivo.** Si deseas crearlos uno por uno conforme aprendes, sigue la Guía del Estudiante FASE 13. Para entender `package.json` abre `RUTA_SCRIPTS_NPM_PASO_A_PASO.md`.

1. Abre **esta carpeta completa** en VS Code y abre una terminal aquí. Comprueba que ves `package.json` con `dir`/`ls`. Verifica `node --version` y `npm --version`.
2. Escribe `npm install` en la **terminal**, no en `package.json`. Instala dependencias pero no inicia el servidor.
3. Copia `.env.example` a `.env` (PowerShell: `Copy-Item .env.example .env`; macOS/Linux: `cp .env.example .env`). En `.env` genera un `JWT_SECRET` aleatorio de prueba con `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"` y valores ficticios para `DEMO_ADMIN_PASSWORD` y `LAB_PASSWORD`. No uses credenciales personales.
4. Escribe `npm run` y comprueba que aparecen `ej01`, `ej02`, `start`, `test`. Esto **solo lista**, no ejecuta.
5. Escribe `npm run ej01`: ejecuta `ejemplos/EJ01_bcrypt.js`, muestra comprobaciones y termina.
6. Escribe `npm run ej02`: ejecuta `ejemplos/EJ02_jwt.js`, muestra comprobaciones y termina.
7. Para los **estados intermedios** ejecuta `node etapas/EJ03/src/server.js`, detén con Ctrl+C y repite para EJ04, EJ05, EJ06. Todos requieren el puerto libre; mira sus `LEEME.txt`. `npm start` **NO** selecciona la etapa: inicia el estado final.
8. Escribe `npm start`: abre el servidor final en el puerto 3001. Déjalo activo, abre **otra terminal** y ejecuta `node -e "fetch('http://localhost:3001/publico').then(r=>r.json()).then(console.log)"`; vuelve a la primera terminal y detén con Ctrl+C.
9. Escribe `npm test`: ejecuta `node --test pruebas/EJ07_flujo.test.js`, inicia una API interna en un puerto disponible, comprueba H1–H4 y termina. No requiere `npm start` activo.
10. Completa las siete tareas espejo y ejecútalas desde la raíz con `node tareas/T01.js` hasta `node tareas/T07.js`. En la versión estudiante los TODO son trabajos pendientes, no soluciones automáticas.

**¿Qué significa cada línea en `scripts`?** `ej01` y `ej02` son nombres personalizados; `start` y `test` son convenciones npm. La parte derecha después de los dos puntos es la orden real. `node` corre JavaScript; `--test` habilita el runner nativo; las rutas son **rutas de archivos relativas a esta carpeta**, no direcciones web. No copiar estas líneas a `src/server.js`.

## Estructura
- `ejemplos/`: EJ01 y EJ02 autónomos.
- `src/`: estado integrado EJ07 (servidor Express).
- `etapas/`: estados incrementales EJ03, EJ04, EJ05, EJ06; no modificar el final al revisarlos.
- `pruebas/`: EJ07, batería reproducible.
- `tareas/`: T01–T07, artefactos de práctica, tareas espejo y soluciones correspondientes.

## Privacidad, límites y mensajes de error
- La base de usuarios es en memoria, se pierde al detener Node. La persistencia con MongoDB/Mongoose de la sesión anterior **no está activada** para mantener aislado el aprendizaje de seguridad.
- JWT **firmado no significa cifrado**; no pongas contraseñas ni datos sensibles en payload.
- CORS establece cabeceras para navegadores, no bloquea clientes externos como `curl`; no sustituye el control de permisos.
- Una clave `.env` de laboratorio no equivale a gestión de secretos en producción.
