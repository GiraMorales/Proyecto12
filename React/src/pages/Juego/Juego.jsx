import './Juego.css';
import { useReducer, useEffect } from 'react';
import {
  gameReducer,
  initialState
} from '../../Reducers/GameReducer/gameReducer';
import { useBingoCarton } from '../../Hooks/useBingoCarton/useBingoCarton';
import { useNavigate } from 'react-router-dom';
import { hayBingo, hayLinea } from '../../Utils/HayBingo/HayBingo';
import { CartonBingo } from '../../Components/CartonBingo/CartonBingo';

const Juego = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { carton } = useBingoCarton();

  useEffect(() => {
    let interval;

    if (state.enJuego) {
      interval = setInterval(() => {
        let numero;
        do {
          numero = Math.floor(Math.random() * 75) + 1;
        } while (
          state.numerosCantados.includes(numero) &&
          state.numerosCantados.length < 75
        );

        if (state.numerosCantados.length < 75) {
          dispatch({ type: 'CANTAR_NUMERO', payload: numero });

          const numerosFinales = [...state.numerosCantados, numero];

          if (!state.lineaGanada && hayLinea(carton, numerosFinales)) {
            dispatch({ type: 'LINEA_GANADA' });

            clearInterval(interval);
            setTimeout(() => {
              if (state.enJuego) {
                interval = setInterval(() => {
                  let numero;
                  do {
                    numero = Math.floor(Math.random() * 75) + 1;
                  } while (
                    state.numerosCantados.includes(numero) &&
                    state.numerosCantados.length < 75
                  );

                  if (state.numerosCantados.length < 75) {
                    dispatch({ type: 'CANTAR_NUMERO', payload: numero });
                    const nums = [...state.numerosCantados, numero];
                    if (hayBingo(carton, nums)) {
                      dispatch({ type: 'TERMINAR_JUEGO' });
                      clearInterval(interval);
                      navigate('/ganador', {
                        state: { carton, numerosCantados: nums }
                      });
                    }
                  } else {
                    clearInterval(interval);
                    dispatch({ type: 'TERMINAR_JUEGO' });
                  }
                }, 1000);
              }
            });
          }

          if (hayBingo(carton, numerosFinales)) {
            dispatch({ type: 'TERMINAR_JUEGO' });
            clearInterval(interval);
            navigate('/ganador', {
              state: { carton, numerosCantados: numerosFinales }
            });
          }
        } else {
          clearInterval(interval);
          dispatch({ type: 'TERMINAR_JUEGO' });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    state.enJuego,
    state.numerosCantados,
    state.lineaGanada,
    carton,
    navigate
  ]);

  return (
    <div className='juego'>
      <h2> ¡Juguemos al Bingo! </h2>
      {state.lineaGanada && (
        <div className='alerta-linea'>🎉 ¡Has hecho LÍNEA!</div>
      )}

      <button
        className='btn-iniciar'
        onClick={() => dispatch({ type: 'INICIAR_JUEGO' })}
        disabled={state.enJuego}
      >
        Iniciar Juego
      </button>

      <div className='numeros-carton'>
        <div className='titulo-numeros'>
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
          <CartonBingo
            carton={carton}
            numerosCantados={state.numerosCantados}
          />
        </div>
      </div>
    </div>
  );
};

export default Juego;
