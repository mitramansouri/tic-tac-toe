import Player from "./components/Player"

function App() {


  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player  sympol='X' initialName='Player one'></Player>
          <Player sympol='O' initialName='Player Two'></Player>
        </ol>
        Game board
      </div>
    </main>
  )
}

export default App
