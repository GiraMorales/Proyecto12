import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameReducer, initialState } from '../reducers/gameReducer';
import { hayBingo } from '../../Utils/HayBingo/HayBingo';

export const useGameState = (carton) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const iniciarJuego = () => {
    dispatch({ type: 'INICIAR_JUEGO' });
  };

  const cantarNumero = () => {
    let numero;
    do {
      numero = Math.floor(Math.random() * 75) + 1;
    } while (
      state.numerosCantados.includes(numero) &&
      state.numerosCantados.length < 75
    );

    if (state.numerosCantados.length < 75) {
      dispatch({ type: 'CANTAR_NUMERO', payload: numero });

      const numerosActualizados = [...state.numerosCantados, numero];
      if (hayBingo(carton, numerosActualizados)) {
        dispatch({ type: 'TERMINAR_JUEGO' });
        navigate('/ganador');
      }
    }
  };

  return {
    state,
    iniciarJuego,
    cantarNumero
  };
};
