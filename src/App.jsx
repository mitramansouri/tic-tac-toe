import Player from "./components/Player"

function App() {


  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player  sympol='X' name='Player one'></Player>
          <Player sympol='O' name='Player Two'></Player>
        </ol>
        Game board
      </div>
    </main>
  )
}

export default App
