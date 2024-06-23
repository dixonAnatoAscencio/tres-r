import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  //componente separado de la app reutilizable
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  }

  return (
     <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() { //componente padre app
  const [board, setBoard] = useState(Array(9).fill(null));
  console.log(board);

  const [turn, setTurn] = useState(TURNS.X); //inicie el turno en X
  const [winner, setWinner] = useState(null); //null es que no hay ganador , false es que hay un empate

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS) {
      //revisamos todas las combinaciones de 3 posiciones
      //si todas las posiciones son iguales, es un ganador
      const [a, b, c] = combo;
      if(
        boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a];
      }
    }
    return null; //no hay ganador
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return; // cunado en esa posicion ya esta marcado o hay ganador no se actualiza
    //actualizamos el tablero
    const newBoard = [...board]//crear una copia del array // nunca hacer esto board[index] = turn no tenemos que mutar nunca las props ni el ESTADO
    newBoard[index] = turn;
    setBoard(newBoard);

    //actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(board);
   if(newWinner) {
     setWinner(newWinner);//los estados son asincronos, por eso debemos pasar siempre el ultimo estado. IMPORTANTISIMO
   }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard} >
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  );
}

export default App;
