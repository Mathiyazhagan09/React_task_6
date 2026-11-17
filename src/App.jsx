
import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Winning combinations
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Handle cell click
  const handleCellClick = (index) => {
    if (board[index] !== "" || winner !== null) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    setBoard(updatedBoard);

    // Check winner
    const hasWon = winningPatterns.some((pattern) =>
      pattern.every((position) => updatedBoard[position] === currentPlayer)
    );

    if (hasWon) {
      setWinner(currentPlayer);
    } else if (updatedBoard.every((cell) => cell !== "")) {
      setWinner("Draw");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="game-container">

      <div className="game-card">

        <h1>XO Game</h1>

        <p className="subtitle">Tic-Tac-Toe Challenge</p>

        <div className="game-status">
          {winner === "Draw" ? (
            <h2>It's a Draw!</h2>
          ) : winner ? (
            <h2>Player {winner} Wins!</h2>
          ) : (
            <h2>Player {currentPlayer}'s Turn</h2>
          )}
        </div>

        <div className="game-board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`game-cell ${cell === "X" ? "x-player" : "o-player"}`}
              onClick={() => handleCellClick(index)}
              disabled={cell !== "" || winner !== null}
              aria-label={`Cell ${index + 1}: ${cell || "empty"}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>

        <div className="game-footer">
          <span>Player X</span>
          <span>Player O</span>
        </div>

      </div>

    </div>
  );
}

export default App;
