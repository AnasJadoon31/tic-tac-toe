function Winner({ winner, rematch }) {
  return (
    <div id="game-over">
      {winner ? <h2>Congratulations!</h2> : <h2>Game Over</h2>}
      {winner ? <p>You have won the game, {winner.toUpperCase()}!</p> : <p>It's a draw!</p>}
      <button onClick={rematch}>Play Again</button>
    </div>
  );
}

export default Winner;
