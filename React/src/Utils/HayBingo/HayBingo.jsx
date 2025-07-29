export const hayBingo = (carton, numerosCantados) => {
  const estaMarcado = (num) => num === '★' || numerosCantados.includes(num);

  for (let fila of carton) {
    if (fila.every(estaMarcado)) return true;
  }

  for (let col = 0; col < 5; col++) {
    const columna = carton.map((fila) => fila[col]);
    if (columna.every(estaMarcado)) return true;
  }

  const diagonal1 = carton.map((fila, i) => fila[i]);
  const diagonal2 = carton.map((fila, i) => fila[4 - i]);

  if (diagonal1.every(estaMarcado) || diagonal2.every(estaMarcado)) return true;

  return false;
};
