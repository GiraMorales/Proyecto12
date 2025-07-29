// src/reducers/gameReducer.js

export const initialState = {
  numerosCantados: [],
  enJuego: false
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'INICIAR_JUEGO':
      return {
        numerosCantados: [],
        enJuego: true
      };

    case 'CANTAR_NUMERO':
      if (!state.enJuego || state.numerosCantados.includes(action.payload))
        return state;
      return {
        ...state,
        numerosCantados: [...state.numerosCantados, action.payload]
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
