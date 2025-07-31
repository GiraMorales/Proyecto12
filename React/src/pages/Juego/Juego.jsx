import './Juego.css';
import { useReducer } from 'react';
import {
  gameReducer,
  initialState
} from '../../Reducers/GameReducer/gameReducer';
import { useBingoCarton } from '../../Hooks/useBingoCarton/useBingoCarton';
import { useNavigate } from 'react-router-dom';
import { hayBingo } from '../../Utils/HayBingo/HayBingo';
import { CartonBingo } from '../../Components/CartonBingo/CartonBingo';

const Juego = () => {
  const navigate = useNavigate();
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

      // Chequeo de ganador (delay opcional para que el número se vea primero)
      setTimeout(() => {
        if (hayBingo(carton, [...state.numerosCantados, numero])) {
          dispatch({ type: 'TERMINAR_JUEGO' });
          navigate('/ganador');
        }
      }, 300); // espera 300ms para que se vea el número nuevo marcado
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
      <div className='numeros-carton'>
        <div className='titulo-numeros'>
          <h3>Números Cantados:</h3>
          <div className='lista-numeros'> </div>
          {state.numerosCantados.map((n, i) => (
            <span key={i} className='numero'>
              {n}
            </span>
          ))}
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
