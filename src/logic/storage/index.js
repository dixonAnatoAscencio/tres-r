export const saveGameToStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board)); //limpiamos el localStorage de partidas y turno
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  //guardar partida
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};
