import Player from "./components/Player"
import GameBoard from './components/GameBoard.jsx';
import { useState } from "react";
function App() {
  const [activePlayer , setActivePlayer] = useState('X');

  function handleSelectSquare(){
    setActivePlayer((currentlyActive)=>  currentlyActive === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player sympol='X' initialName='Player one' isActive={activePlayer === 'X'}></Player>
          <Player sympol='O' initialName='Player Two'isActive={activePlayer === 'O'}></Player>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
