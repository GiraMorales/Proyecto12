import React from 'react';

export const CartonBingo = React.memo(({ carton, numerosCantados }) => {
  return (
    <table>
      <tbody>
        {carton.map((fila, i) => (
          <tr key={i}>
            {fila.map((celda, j) => (
              <td
                key={j}
                className={numerosCantados.includes(celda) ? 'marcado' : ''}
              >
                {celda}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
