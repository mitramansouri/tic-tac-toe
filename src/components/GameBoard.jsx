import { useState } from "react";

const initalGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


export default function GameBoard({onSelectSquare , activePlayerSymbol}) {

    const [gameBoard, setGameBoard] = useState(initalGameBoard);

    function handleSelectSquare(rowIndex, columnIndex) {
        setGameBoard((previousGameBoard) => {
            // immuatable way 
            const updateGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
            updateGameBoard[rowIndex][columnIndex] = activePlayerSymbol;
            return updateGameBoard;
        });

        onSelectSquare();
    }
    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}>
                                <button onClick={() => handleSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}