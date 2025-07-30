function Log({ turns, playerNames }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.column}`}>
          {playerNames[turn.player]} at {turn.square.row} {turn.square.column}
        </li>
      ))}
      ;
    </ol>
  );
}

export default Log;
