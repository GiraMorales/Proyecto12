import './Juego.css';
import { useReducer } from 'react';
import {
  gameReducer,
  initialState
} from '../../Reducers/GameReducer/gameReducer';
import { useBingoCarton } from '../../Hooks/useBingoCarton/useBingoCarton';

const Juego = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { carton } = useBingoCarton();

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
    }
  };

  return (
    <div className='juego'>
      <h2> ¡Juguemos al Bingo! </h2>

      <button
        className='btn-cantar'
        onClick={cantarNumero}
        disabled={!state.enJuego}
      >
        Cantar Número
      </button>

      <button
        className='btn-iniciar'
        onClick={() => dispatch({ type: 'INICIAR_JUEGO' })}
      >
        Iniciar Juego
      </button>

      <div className='numeros-cantados'>
        <h3>Números Cantados:</h3>
        <div className='lista-numeros'>
          {state.numerosCantados.map((n, i) => (
            <span key={i} className='numero'>
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className='carton'>
        <h3>Tu Cartón:</h3>
        <table>
          <tbody>
            {carton.map((fila, i) => (
              <tr key={i}>
                {fila.map((celda, j) => (
                  <td
                    key={j}
                    className={
                      state.numerosCantados.includes(celda) ? 'marcado' : ''
                    }
                  >
                    {celda}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Juego;
