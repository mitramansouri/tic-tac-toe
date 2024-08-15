import Player from "./components/Player";
import GameBoard from './components/GameBoard.jsx';
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winnning_combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');
  const [players, setPlayers] = useState({
    X: { name: 'Player One', symbol: 'X' },
    O: { name: 'Player Two', symbol: 'O' }
  });
  function handleSelectSquare(rowIndex, columnIndex) {
    const currentPlayer = players[activePlayer];

    // Check if the square is already taken to avoid overriding it
    const isSquareTaken = gameTurns.some(
      (turn) => turn.square.row === rowIndex && turn.square.col === columnIndex
    );
    if (isSquareTaken) return;

    setGameTurns((prevTurns) => [
      ...prevTurns,
      { square: { row: rowIndex, col: columnIndex }, player: activePlayer, name: currentPlayer.name }
    ]);

    // Toggle player after making a move
    setActivePlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  }
  // Create a copy of the initial game board to prevent mutation
  let gameBoard = initialGameBoard.map(row => [...row]);

  // Apply the turns to the game board
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  };

  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
        //winner - abort game 
        winner = firstSymbol;
    }
  };

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: { ...prevPlayers[symbol], name: newName }
    }));
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player sympol='X' initialName={players.X.name} isActive={activePlayer === 'X'} onNameChange={(newName) => handleNameChange('X', newName)} />
          <Player sympol='O' initialName={players.X.name} isActive={activePlayer === 'O'} onNameChange={(newName) => handleNameChange('X', newName)} />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
