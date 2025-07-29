// src/pages/Ganador/Ganador.jsx
import { Link } from 'react-router-dom';
import './Ganador.css';

const Ganador = () => {
  return (
    <div className='ganador'>
      <h1>🎉 ¡BINGO! 🎉</h1>
      <p>¡Felicidades, has ganado!</p>
      <Link to='/' className='btn-volver'>
        Volver al inicio
      </Link>
    </div>
  );
};

export default Ganador;
