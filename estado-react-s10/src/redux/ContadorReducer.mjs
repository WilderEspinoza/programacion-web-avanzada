export const estadoInicial = { contador: 0 };

export function contadorReducer(state = estadoInicial, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return { ...state, contador: state.contador + 1 };
    case "DECREMENTAR":
      return { ...state, contador: state.contador - 1 };
    default:
      return state;
  }
} 