import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gamePlayer, setGamePlayer] = useState(initialGameBoard);

  function handleClickBoard(rowIndex, colIndex) {
    setGamePlayer((prevGamBoard) => {
      const newGameBoard = [
        ...prevGamBoard.map((innerElement) => [...innerElement]),
      ];
      newGameBoard[rowIndex][colIndex] = "X";
      return newGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gamePlayer.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => handleClickBoard(rowIndex, colIndex)}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
