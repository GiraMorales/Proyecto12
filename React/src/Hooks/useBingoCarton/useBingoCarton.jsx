import { useState, useEffect } from 'react';

const generarCarton = () => {
  const columnas = [
    { inicio: 1, fin: 15 }, // B
    { inicio: 16, fin: 30 }, // I
    { inicio: 31, fin: 45 }, // N
    { inicio: 46, fin: 60 }, // G
    { inicio: 61, fin: 75 } // O
  ];

  const columnasGeneradas = columnas.map(({ inicio, fin }) => {
    const numeros = new Set();
    while (numeros.size < 5) {
      const numero = Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
      numeros.add(numero);
    }
    return Array.from(numeros);
  });

  // Transformar columnas a filas (traspuesta)
  const carton = Array.from({ length: 5 }, (_, filaIndex) =>
    columnasGeneradas.map((columna, colIndex) => {
      if (filaIndex === 2 && colIndex === 2) return '★'; // Estrella en el centro
      return columna[filaIndex];
    })
  );

  return carton;
};

export const useBingoCarton = () => {
  const [carton, setCarton] = useState([]);

  useEffect(() => {
    const nuevoCarton = generarCarton();
    setCarton(nuevoCarton);
  }, []);

  return { carton };
};
