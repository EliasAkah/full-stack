import {useState, useRef} from 'react';

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState('')

  //use playerName.current to access any of the attributes of input element
  function changeName(){
    setEnteredPlayerName(playerName.current.value)
  }
  
  return (
    <section id="player">
      <h2>Welcome { enteredPlayerName ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input ref = {playerName} type="text" />
        <button onClick = {changeName}>Set Name</button>
      </p>
    </section>
  );
}
