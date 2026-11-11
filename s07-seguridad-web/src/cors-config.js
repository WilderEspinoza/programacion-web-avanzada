const origenes = ['http://localhost:4200'];

const corsOpciones = {
  origin: (origen, callback) => {
    // Sin Origin: permite pruebas desde terminal; no equivale a autorización.
    if (!origen || origenes.includes(origen)) return callback(null, true);
    // No anuncia permiso CORS a otros orígenes: el navegador no podrá leer.
    return callback(null, false);
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
module.exports = { corsOpciones };
