---
course_id: ISIL-30690
session_id: S07
module_id: TEMA_07
status: revisado-v2
---

# Ruta de ejecución de la sesión 07 — `package.json` y scripts npm

**ISIL · Programación Web Avanzada | Lideratec Academy**  
**Propósito:** tener claro qué archivo construir, en qué momento modificar `package.json`, cuál comando introducir en terminal, para qué sirve y qué debe pasar.

**Principio:** los scripts de npm son **atajos**, no pasos que npm ejecuta todos seguidos ni archivos que se crean automáticamente. Se agregan a medida que construyes los ejemplos. Cada comando se escribe en la **terminal**, y su valor (`node ...`) está definido en `package.json`, ubicado en la **raíz del proyecto**.


## 1. Cómo leer `package.json` y ejecutar comandos sin perder el orden

**Distingue cuatro cosas que cumplen funciones diferentes.** `package.json` es el archivo de configuración ubicado en la raíz; `scripts` es un objeto dentro de él; `node` es el programa que ejecuta JavaScript; `npm` lee los scripts y facilita lanzarlos desde la terminal. Un script **NO instala dependencias, no crea automáticamente archivos y no obliga a ejecutar los otros scripts**.

Cuando escribes `npm run ej01`, npm busca la clave `ej01` dentro de `scripts` y ejecuta literalmente `node ejemplos/EJ01_bcrypt.js` tomando como referencia la raíz del proyecto. Podrías escribir este comando largo directamente, pero el alias deja una instrucción común para toda la clase. Cuando usas `npm start` o `npm test`, npm utiliza los alias especiales `start` y `test` (sin necesidad de escribir `run`).

**Secuencia global de la sesión, de principio a fin:**

| Momento | Qué debes terminar ANTES | Qué añades a `scripts` | Qué ejecutas y qué observas |
|---|---|---|---|
| Preparación | `npm init -y`, `npm install`, `.env`, carpetas | `"scripts": {}` | `npm run` muestra los scripts disponibles; aún no hay ejercicios listos. |
| EJ01 | Crear y guardar `ejemplos/EJ01_bcrypt.js` | `"ej01": "node ejemplos/EJ01_bcrypt.js"` | `npm run ej01` → tres líneas de verificación con `true`, `true`, `false`. |
| EJ02 | Crear y guardar `ejemplos/EJ02_jwt.js` | `"ej02": "node ejemplos/EJ02_jwt.js"` | `npm run ej02` → firma válida y token manipulado rechazado. |
| EJ03 | Crear completos `src/server.js` y `src/crear-app.js` | `"start": "node src/server.js"` | `npm start` → servidor escuchando en `http://localhost:3001`; **se queda encendido**. |
| EJ04–EJ06 | Guardar middleware y nuevas rutas en `src/` | Nada nuevo: se reutiliza `start` | Presiona **Ctrl+C** para detener, luego `npm start` para cargar cambios; prueba 401/200, 403/200 y CORS. |
| EJ07 | Crear y guardar `pruebas/EJ07_flujo.test.js` | `"test": "node --test pruebas/EJ07_flujo.test.js"` | `npm test` → pruebas H1–H4 y resumen PASS/FAIL; **no requiere servidor manual**. |

**Dónde se escribe cada cosa.** El texto con `"ej01": ...` se escribe en el archivo `package.json`, **dentro del objeto `scripts`**. En cambio, `npm run ej01` se escribe en la **terminal de VS Code**, no en un archivo JavaScript ni dentro del JSON. El código fuente se escribe en los archivos `.js` indicados en cada ejemplo. **Guarda con Ctrl+S** antes de ejecutar.

**Cómo saber dónde estás:** en la terminal situada en la carpeta principal ejecuta `npm run` para mostrar los nombres de scripts. El directorio debe contener `package.json`; puedes comprobarlo con `ls` (macOS/Linux) o `dir` (PowerShell). `node --version` comprueba Node, pero **no** comprueba que estés en la carpeta correcta.

**Cómo interpretar cada ejecución:** los scripts `ej01` y `ej02` imprimen resultados y terminan; `start` inicia una API que sigue esperando peticiones hasta presionar Ctrl+C; `test` ejecuta las pruebas de Node, arranca internamente una instancia temporal en un puerto libre y la cierra al terminar. `npm test` no es la misma operación que `npm start`.

> **Regla de oro:** `crear y guardar archivo → agregar su script → ejecutar en terminal → observar salida → explicar → continuar al siguiente EJ`. No avances si el nombre del archivo aún no existe o si un script anterior falló.

### 1.2 Cómo editar el objeto `scripts` sin romper el JSON

Un `package.json` tiene **una única** pareja de llaves exteriores `{ ... }`. `scripts` está al mismo nivel que `dependencies`, nunca dentro de `dependencies`. Por ejemplo, cuando ya existen EJ01 y EJ02, la sección que editas queda así:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js",
  "ej02": "node ejemplos/EJ02_jwt.js"
}
```

El ejemplo anterior es **solo el fragmento** que va dentro del `package.json` original; no debe guardarse como archivo JSON aislado. La coma entre `ej01` y `ej02` separa dos propiedades; **no** coloques una coma después del último script. Cuando haya otra propiedad después del objeto `scripts`, sí necesitarás una coma **después de la llave de cierre de `scripts`**. Si VS Code marca error JSON, revisa ambas posiciones antes de ejecutar.

**Comprueba la sintaxis del archivo completo** desde la terminal:

```bash
node -e "const p=require('./package.json'); console.log('Scripts configurados:', Object.keys(p.scripts))"
```

El resultado mostrará `Scripts configurados: []` al comienzo; luego irá incluyendo `ej01`, `ej02`, `start` y `test`. Esta comprobación solo lee JSON: **no ejecuta** ninguno de los scripts.


## EJ01 — hito operativo

### Paso final de EJ01 — crear el primer script y ejecutarlo

1. Comprueba que `ejemplos/EJ01_bcrypt.js` **ya tiene todas las líneas del ejemplo** y está guardado.
2. Abre `package.json` desde el explorador de VS Code y localiza `"scripts": {}`.
3. **Dentro de esas llaves**, escribe exactamente:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js"
}
```

**Por qué:** `ej01` es el nombre de nuestro atajo; `node` llama al intérprete JavaScript; `ejemplos/` indica la carpeta; `EJ01_bcrypt.js` es el archivo que acabas de escribir. No está ejecutando Express ni levantando un servidor: solo verifica el proceso de hashing y comparación.

4. Guarda `package.json`, abre la terminal **en la raíz** y ejecuta `npm run ej01`.
5. Interpreta la salida: `Hash generado: true` demuestra que se obtuvo un hash con el formato esperado, `Contraseña correcta: true` verifica la coincidencia y `Contraseña diferente: false` confirma que otra candidata es rechazada. `npm run ej01` termina; puedes escribir enseguida el siguiente comando.
6. **No ejecutes todavía `npm run ej02`, `npm start` ni `npm test`:** todavía no has creado los archivos que necesitan.


## EJ02 — hito operativo

### Paso final de EJ02 — añadir el segundo script sin borrar el primero

1. Guarda completo `ejemplos/EJ02_jwt.js`. Abre `package.json`, localiza el script `ej01` existente y **añade otra propiedad** separada por coma:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js",
  "ej02": "node ejemplos/EJ02_jwt.js"
}
```

2. **No borres `ej01`** ni `dependencies`. `ej02` es un atajo para que Node ejecute el archivo `EJ02_jwt.js`; necesita `JWT_SECRET` definido en `.env`, pero no requiere Express iniciado.
3. Desde la raíz ejecuta primero `npm run` y comprueba que aparecen ambos nombres. Luego ejecuta `npm run ej02`.
4. Observa que la firma verifica un token que hemos creado, y que una modificación produce rechazo. **No publiques el token** ni su secreto. Como este es otro script de consola, **termina solo**.
5. Si aparece `Missing script: "ej02"`, revisa el nombre de la clave en `scripts`. Si aparece `Cannot find module ... EJ02_jwt.js`, revisa la ruta y que el archivo existe; son problemas diferentes.


## EJ03 — hito operativo

### Paso final de EJ03 — incorporar `start` y levantar por primera vez Express

1. **Antes de arrancar**, comprueba que estén guardados **los dos archivos** `src/server.js` y `src/crear-app.js`; `server.js` importa a `crear-app.js`, por eso ninguno debe faltar.
2. En `package.json`, conserva los dos scripts anteriores y agrega `start` dentro del mismo objeto:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js",
  "ej02": "node ejemplos/EJ02_jwt.js",
  "start": "node src/server.js"
}
```

3. Guarda, ubícate en la raíz del proyecto y ejecuta `npm start` (o `npm run start`, ambos usan el mismo script). npm traduce esa línea a `node src/server.js`: Node ejecuta `iniciar()`, `crearApp()` construye Express, `app.listen(...)` abre el puerto 3001 y la terminal queda ocupada porque el servidor **permanece escuchando**.
4. Debe mostrarse `API de laboratorio: http://localhost:3001`. Esto **no significa** que ya se haya probado el login; solo confirma el arranque del proceso.
5. Sin cerrar esta terminal, abre **Terminal → Nuevo terminal** en VS Code, confirma que estás en la misma carpeta y ejecuta:

```bash
node -e "fetch('http://localhost:3001/publico').then(r=>r.json()).then(console.log)"
```

6. **Qué ocurre:** el segundo proceso Node hace una petición GET a la API que se encuentra encendida en el primer terminal. La respuesta muestra el mensaje de la ruta pública; si el servidor no está activo obtendrás un error de conexión.
7. Para detener el servidor, regresa al primer terminal y pulsa **Ctrl+C**. Al modificar archivos `src/*.js` en EJ04, EJ05 o EJ06, necesitarás ejecutar otra vez `npm start`: nuestro laboratorio **no incorpora reinicio automático** (no usamos nodemon).


## EJ07 — hito operativo

### Paso final de EJ07 — añadir `test` y ejecutar las pruebas automatizadas

1. Guarda completamente `pruebas/EJ07_flujo.test.js`. A diferencia de `ej01` y `ej02`, este archivo utiliza `node:test` y `assert` para verificar varias solicitudes HTTP.
2. Abre `package.json` y agrega `test` sin perder las tres entradas anteriores:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js",
  "ej02": "node ejemplos/EJ02_jwt.js",
  "start": "node src/server.js",
  "test": "node --test pruebas/EJ07_flujo.test.js"
}
```

3. **Qué significa cada parte:** `test` es el nombre convencional reconocido por `npm test`; `node` es el intérprete; `--test` activa el ejecutor de pruebas **integrado en Node.js**; `pruebas/EJ07_flujo.test.js` es el archivo de pruebas y no una ruta HTTP. **No hace falta instalar Jest ni Mocha**.
4. Si dejaste una API iniciada con `npm start`, puedes detenerla con **Ctrl+C** para concentrarte en la salida de pruebas. El test llama a `crearApp()` y utiliza `app.listen(0)` para abrir un puerto libre **solo durante la prueba**; al terminar, lo cierra. No necesitas ejecutar `npm start` antes de `npm test`.
5. En la raíz ejecuta `npm test`. Se esperan cuatro pruebas H1, H2, H3 y H4 aprobadas y un resumen sin fallos. Si una falla, revisa primero el nombre del caso, el `assert.equal` que falló y el status/cabecera que devuelve la API.
6. **Diferencia final:** `npm start` arranca un servicio para probar manualmente; `npm test` comprueba automáticamente el comportamiento y termina por sí solo.


## 2. Hitos que comparten servidor

En EJ04, EJ05 y EJ06 **no se añade un script nuevo**. Cada vez que guardes cambios en `src/crear-app.js` o en `src/middleware` o `src/cors-config.js`, detén el proceso anterior con **Ctrl+C** y vuelve a ejecutar **`npm start`**. Usa una segunda terminal para tus solicitudes HTTP; no mezcles peticiones en la terminal donde corre el servidor. Recuerda: acceso sin Bearer a `/perfil` → 401; con Bearer válido → 200; rol insuficiente en `/admin/dashboard` → 403; CORS regula lectura desde navegador, no impone por sí mismo roles de servidor.

## 3. Si trabajas con FASE 15 (proyecto ya construido)

No necesitas editar scripts: el `package.json` **incluido en `estudiante/` o `docente/` ya contiene todos**. Abre **solo una de esas carpetas** como raíz en VS Code, ejecuta `npm install`, copia `.env.example` a `.env` y agrega valores **ficticios**. A partir de ahí ejecuta, en orden, `npm run ej01`, `npm run ej02`, `npm start` y `npm test`; **detén el servidor entre `start` y `test` para simplificar la clase**. Para los estados históricos independientes EJ03–EJ06, consulta `etapas/EJxx/LEEME.txt` y ejecútalos uno por uno con `node etapas/EJxx/src/server.js`.


## 4. `package.json` final explicado y guía de diagnóstico de scripts

Al terminar EJ07, todos los archivos ya existen y el bloque completo queda así. **Solo se muestra `scripts`**, situado dentro del mismo `package.json` que ya contiene tus dependencias:

```json
"scripts": {
  "ej01": "node ejemplos/EJ01_bcrypt.js",
  "ej02": "node ejemplos/EJ02_jwt.js",
  "start": "node src/server.js",
  "test": "node --test pruebas/EJ07_flujo.test.js"
}
```

**Tabla de interpretación de errores:**

| Mensaje o síntoma | Significa | Qué revisar, en este orden |
|---|---|---|
| `Missing script: "ej01"` | npm no encuentra ese alias | Abre `package.json`; revisa `scripts`, nombre exacto, guarda y ejecuta `npm run`. |
| `Cannot find module .../EJ01_bcrypt.js` | La ruta del script apunta a un archivo inexistente | Revisa nombre, mayúsculas, ubicación `ejemplos/` y si guardaste el `.js`. |
| `Cannot find module 'bcryptjs'` o `'express'` | Faltan librerías instaladas en esta carpeta | Desde la raíz, ejecuta `npm install`; asegúrate de abrir la carpeta correcta. |
| `Unexpected token` / error al leer `package.json` | El JSON está mal formado | Revisa comas entre scripts, llaves y ausencia de comentarios o comas finales. |
| `Configura JWT_SECRET` o `LAB_PASSWORD` | Falta configuración local del ejercicio | Revisa `.env` en la raíz; no copies valores sensibles a capturas o entregas. |
| `EADDRINUSE` | Ya se está usando el puerto 3001 | Detén servidor anterior con **Ctrl+C** y vuelve a ejecutar `npm start`. |
| `fetch failed` al pedir `/publico` | No existe servidor activo en ese puerto | Ejecuta `npm start` en una terminal, sin cerrarla; consulta desde otra. |
| `npm test` falla en H1–H4 | Algún comportamiento es distinto al esperado | Lee el nombre del test y compara status/cabeceras; no cambies una prueba para ocultar el fallo. |

**Autocomprobación de cierre:** explica por qué ejecutar `npm run ej01` no abre un puerto, por qué `npm start` queda funcionando y por qué `npm test` puede trabajar sin servidor manual. Comprueba que los cuatro scripts aparecen con `npm run` y que `node -e "require('./package.json'); console.log('JSON válido')"` imprime `JSON válido`.
