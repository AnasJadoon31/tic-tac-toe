import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./components/winningCombinations.js";
import Winner from "./components/Winner.jsx";

const PLAYERS = {
    X: "Player 1", O: "Player 2",
};

const INITIAL_GAME_BOARD = [[null, null, null], [null, null, null], [null, null, null],];

function deriveActivePlayer(turns) {
    let currentPlayer = "X";
    if (turns.length > 0 && turns[0].player === "X") {
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameState) {
    let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])]; // Create a copy of the initial game board

    // Deriving states
    for (const turn of gameState) {
        const {square, player} = turn;
        const {row, column} = square;
        gameBoard[row][column] = player; // assign player symbol directly
    }
    return gameBoard;
}

function deriveWinner(gameBoard, playerNames) {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = playerNames[firstSquareSymbol];
            break;
        }
    }
    return winner;
}

function App() {
    const [playerNames, setPlayerNames] = useState(PLAYERS);
    const [gameState, setGameState] = useState([]);
    const activePlayer = deriveActivePlayer(gameState);

    const gameBoard = deriveGameBoard(gameState);
    const winner = deriveWinner(gameBoard, playerNames);
    const draw = gameState.length === 9 && !winner;

    function handlePlayerChange(rowIndex, columnIndex) {
        setGameState((prevGameState) => {
            const currentPlayer = deriveActivePlayer(prevGameState);
            return [{
                square: {row: rowIndex, column: columnIndex}, player: currentPlayer,
            }, ...prevGameState,];
        });
    }

    function handleRematch() {
        setGameState([]);
    }

    function handlePlayerNameChange(player, newName) {
        setPlayerNames((prevNames) => ({
            ...prevNames, [player]: newName,
        }));
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player
                    initialName={PLAYERS.X}
                    symbol="X"
                    isActive={activePlayer === "X"}
                    playerNameChange={handlePlayerNameChange}
                />
                <Player
                    initialName={PLAYERS.O}
                    symbol="O"
                    isActive={activePlayer === "O"}
                    playerNameChange={handlePlayerNameChange}
                />
            </ol>
            {(winner || draw) && <Winner winner={winner} rematch={handleRematch}/>}
            <GameBoard
                onSelectSquare={handlePlayerChange}
                board={gameBoard}
            />
        </div>
        <Log turns={gameState} playerNames={playerNames}/>
    </main>);

}

export default App;
