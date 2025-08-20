const estaMarcado = (num, numerosCantados) =>
  num === '★' || numerosCantados.includes(num);

// Comprueba si hay línea (fila completa o columna completa)
export const hayLinea = (carton, numerosCantados) => {
  // comprobar filas
  const hayFila = carton.some((fila) =>
    fila.every((num) => estaMarcado(num, numerosCantados))
  );

  // comprobar columnas
  const hayColumna = Array.from({ length: carton[0].length }, (_, colIndex) =>
    carton.map((fila) => fila[colIndex])
  ).some((col) => col.every((num) => estaMarcado(num, numerosCantados)));

  return hayFila || hayColumna;
};

// Comprueba si hay bingo (todo el cartón)
export const hayBingo = (carton, numerosCantados) => {
  return carton.every((fila) =>
    fila.every((num) => estaMarcado(num, numerosCantados))
  );
};
