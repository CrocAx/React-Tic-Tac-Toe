import { useState } from 'react';

// This component represents an individual square on the game board.
function Square({value, onSquareClick}){
  return (<button className="square" onClick={onSquareClick}>{value}</button>);
}

// This component renders the game board, consisting of multiple squares.
// xIsNext = A boolean indicating if it's currently X's turn to play.
// squares = An array representing the current state of the board.
// onPlay = A function to handle a player's move
function Board({ xIsNext, squares, onPlay }) {
  // Handles the click event on a square. Updates the game state if the move is valid.
  // i = The index of the square that was clicked.
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  // Determines the game status and displays it on the board.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Renders the game board and squares.
  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => {handleClick(0)}}/>
      <Square value={squares[1]} onSquareClick={() => {handleClick(1)}}/>
      <Square value={squares[2]} onSquareClick={() => {handleClick(2)}}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => {handleClick(3)}}/>
      <Square value={squares[4]} onSquareClick={() => {handleClick(4)}}/>
      <Square value={squares[5]} onSquareClick={() => {handleClick(5)}}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => {handleClick(6)}}/>
      <Square value={squares[7]} onSquareClick={() => {handleClick(7)}}/>
      <Square value={squares[8]} onSquareClick={() => {handleClick(8)}}/>
    </div>
    </>
  );
}

// This component represents the overall game, including the board and game information.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Handles a player's move and updates the game history.
  // nextSquares = The next state of the board after the player's move.
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jumps to a specific move in the game history.
  // nextMove = The move number to jump to.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Generates a list of moves in the game, allowing players to jump to specific points.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    
    // Renders button to navigate through the moves
    // key={move} = A unique identifier for React to efficiently update the list.
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Renders the overall game, including the board and move history.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// Helper function to calculate the winner of the game.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}
