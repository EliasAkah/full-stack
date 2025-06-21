import {useState, useRef} from "react";

 function Player() {
  const [name, setName] = useState(null);
  const nameRef = useRef();

  function handleSetName(){
    setName(nameRef.current.value)
  }
  return (
    <section id="player">
      <h2>Welcome {name ? name : "unknown entity"}</h2>
      <p>
        <input type="text" ref = {nameRef} />
        <button onClick = {handleSetName}>Set Name</button>
      </p>
    </section>
  );
}

export default Player;