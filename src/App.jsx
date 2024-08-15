import Player from "./components/Player";
import GameBoard from './components/GameBoard.jsx';
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winnning_combinations.js";
import GameOver from "./components/GameOver.jsx";

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

  const handleSelectSquare = (rowIndex, columnIndex) => {
    if (isSquareTaken(rowIndex, columnIndex)) return;

    const currentPlayer = players[activePlayer];
    setGameTurns(prevTurns => [
      ...prevTurns,
      { square: { row: rowIndex, col: columnIndex }, player: activePlayer, name: currentPlayer.name }
    ]);
    togglePlayer();
  };

  const isSquareTaken = (rowIndex, columnIndex) =>
    gameTurns.some(turn => turn.square.row === rowIndex && turn.square.col === columnIndex);

  const togglePlayer = () => {
    setActivePlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'));
  };

  const createGameBoard = () => {
    let board = initialGameBoard.map(row => [...row]);
    gameTurns.forEach(({ square: { row, col }, player }) => {
      board[row][col] = player;
    });
    return board;
  };

  const checkWinner = (gameBoard) => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination.map(({ row, column }) => gameBoard[row][column]);
      if (a && a === b && a === c) {
        return a;
      }
    }
    return null;
  };

  const gameBoard = createGameBoard();
  const winner = checkWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: { ...prevPlayers[symbol], name: newName }
    }));
  };

  const handleRematch = () => {
    setGameTurns([]);
    setActivePlayer('X');
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol='X'
            initialName={players.X.name}
            isActive={activePlayer === 'X'}
            onNameChange={newName => handleNameChange('X', newName)}
          />
          <Player
            symbol='O'
            initialName={players.O.name}
            isActive={activePlayer === 'O'}
            onNameChange={newName => handleNameChange('O', newName)}
          />
        </ol>
        {(winner || hasDraw) &&
          <GameOver
            winner={winner ? players[winner].name : null}
            isDraw={hasDraw}
            onRestart={handleRematch}
          />
        }
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
