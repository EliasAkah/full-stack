import { useState } from "react";

export default function Player({ name, symbol, isactive, onChangeName }) {
  const [isEditable, setIsEditable] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditing() {
    setIsEditable((prevIsEditable) => !prevIsEditable);
    if (isEditable) {
      onChangeName(symbol, playerName);
    }
  }

  let handleName = (e) => {
    setPlayerName(e.target.value);
  };

  function changeSpan() {
    if (isEditable === true) {
      return (
        <input
          className="player-name"
          type="text"
          value={playerName}
          onChange={handleName}
          required
        />
      );
    } else {
      return <span className="player-name">{playerName}</span>;
    }
  }

  return (
    <li className={isactive ? "active" : undefined}>
      <span className="player">
        {changeSpan()}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleEditing}>{isEditable ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}