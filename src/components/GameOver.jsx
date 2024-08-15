export default function GameOver({winner, isDraw,onRestart}){
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            { winner && <p>{winner} Won!</p>}
            { isDraw && <p>Its a draw!</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    );
}