import { useLocation, Link } from 'react-router-dom';
import { CartonBingo } from '../../Components/CartonBingo/CartonBingo';
import './Ganador.css';

const Ganador = () => {
  const { state } = useLocation();
  const { carton, numerosCantados } = state || {};

  if (!carton || !numerosCantados) {
    return (
      <div className='ganador'>
        <h1>No hay datos del juego</h1>
        <Link to='/'>Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className='ganador'>
      <h1>🎉 ¡BINGO! 🎉</h1>
      <h2>Cartón ganador:</h2>
      <CartonBingo carton={carton} numerosCantados={numerosCantados} />

      <Link to='/bingo'>Volver a jugar</Link>
    </div>
  );
};

export default Ganador;
