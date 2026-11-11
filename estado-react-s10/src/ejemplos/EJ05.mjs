import {contadorReducer} from "../redux/ContadorReducer.mjs";

let estado = contadorReducer(undefined, { type: "@@INICIO" });
console.log('Estado inicial: ', estado.contador); 

for(const tipo of ["INCREMENTAR", "INCREMENTAR", "DECREMENTAR"]) {
  estado = contadorReducer(estado, { type: tipo });
  console.log(`Estado después de ${tipo}: `, estado.contador);
}