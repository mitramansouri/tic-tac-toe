import Player from "./components/Player";
import GameBoard from './components/GameBoard.jsx';
import Log from "./components/Log.jsx";
import { useState } from "react";

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
          <Player sympol='O' initialName={players.X.name} isActive={activePlayer === 'O' } onNameChange={(newName) => handleNameChange('X', newName)} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
