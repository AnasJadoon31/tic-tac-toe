import {useState} from "react";

function Player({initialName, symbol, isActive, playerNameChange}) {
    const [playerName, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const buttonText = isEditing ? "Save" : "Edit";

    const handleEditing = () => {
        if (isEditing) {
            playerNameChange(symbol, playerName);
        }
        setIsEditing((prev) => !prev);
    };

    function handleNameChange(event) {
        setName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let editablePlayerSymbol = <span className="player-symbol">{symbol}</span>;

    if (isEditing) {
        editablePlayerName = (<input
            type="text"
            required
            value={playerName}
            onChange={handleNameChange}
        />);
    }
    return (<li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
          {editablePlayerSymbol}
      </span>
        <button onClick={handleEditing}>
            {buttonText}
        </button>
    </li>);
}

export default Player;
