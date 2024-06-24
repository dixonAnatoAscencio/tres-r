import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";

function App() {//componente padre app
  const [board, setBoard] = useState(() => {// el useState es asyncrono, por eso debemos pasar siempre el ultimo estado
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    //inicie el turno en X
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X; // ?? mira si es null o undefined y || mira si es falsy
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador , false es que hay un empate

  const resetGame = () => {
    //seteamos el estado a sus valores iniciales
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return; // cunado en esa posicion ya esta marcado o hay ganador no se actualiza
    //actualizamos el tablero
    const newBoard = [...board]; //crear una copia del array // nunca hacer esto board[index] = turn no tenemos que mutar nunca las props ni el ESTADO
    newBoard[index] = turn;
    setBoard(newBoard); //asincrona

    //actualizamos el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida
    saveGameToStorage({ board: newBoard, turn: newTurn });

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(board);
    if (newWinner) {
      confetti();
      setWinner(newWinner); //los estados son asincronos, por eso debemos pasar siempre el ultimo estado. IMPORTANTISIMO
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
