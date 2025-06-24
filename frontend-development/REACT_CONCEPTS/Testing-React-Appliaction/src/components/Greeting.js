import { useState } from "react";
import Output from "./Output";

export function Greeting() {
  const [changeText, setChangeText] = useState(false);
  function handleTextChange() {
    setChangeText(true);
  }
  return (
    <>
      <h1>Hello World!</h1>
      {!changeText && <Output>good to see u</Output>}
      {changeText && <Output>Changed!</Output>}
      <button onClick={handleTextChange}>Change Text</button>
    </>
  );
}
