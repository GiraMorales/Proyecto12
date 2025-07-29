import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Tablero />} />
        <Route path='/bingo' element={<Juego />} />
        <Route path='/ganados' element={<Ganador />} />
      </Routes>
    </>
  );
}

export default App;
