

export default function Log({ turns = [] }) {
    return (
        <ol id="log">
            {turns.map(
                (turn, index) => (
                    <li key={index}>
                        {turn.name} ({turn.player}) placed on row {turn.square.row + 1}, column {turn.square.col + 1}
                    </li>
                )
            )}
        </ol>
    );
}
