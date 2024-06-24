import { WINNER_COMBOS } from "../constants";


export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    //revisamos todas las combinaciones de 3 posiciones
    //si todas las posiciones son iguales, es un ganador
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null; //no hay ganador return null
};

export const checkEndGame = (newBoard) => {
    //revisamos si hay un empate
    //si no hay mas espacios vacios en el tablero
    return newBoard.every((square) => square !== null); // si todas las posiciones del arreglo newBoard tiene que square es diferente de null, ha terminado el juego
  };



