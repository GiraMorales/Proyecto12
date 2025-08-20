export const initialState = {
  numerosCantados: [],
  enJuego: false,
  lineaGanada: false
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'INICIAR_JUEGO':
      return {
        numerosCantados: [],
        enJuego: true,
        lineaGanada: false
      };

    case 'CANTAR_NUMERO':
      if (!state.enJuego || state.numerosCantados.includes(action.payload))
        return state;
      return {
        ...state,
        numerosCantados: [...state.numerosCantados, action.payload]
      };

    case 'LINEA_GANADA':
      return {
        ...state,
        lineaGanada: true
      };

    case 'TERMINAR_JUEGO':
      return {
        ...state,
        enJuego: false
      };

    default:
      return state;
  }
};
