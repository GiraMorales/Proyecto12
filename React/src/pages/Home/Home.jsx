import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='home'>
      <h1>Bienvenido al juego de Bingo</h1>
      <p>Disfruta jugando y divirtiéndote con amigos y familiares.</p>
      <p>Haz clic en el botón de abajo para comenzar.</p>
      <Link to={'/bingo'} className='start-button'>
        Comenzar Juego
      </Link>
      <p>¡Buena suerte!</p>
    </main>
  );
};

export default Home;
