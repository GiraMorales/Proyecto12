import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './Components/Header/Header';
import Ganador from './pages/Ganador/Ganador';
import Home from './pages/Home/Home';
import Juego from './pages/Juego/Juego';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bingo' element={<Juego />} />
        <Route path='/ganador' element={<Ganador />} />
      </Routes>
    </>
  );
}

export default App;
