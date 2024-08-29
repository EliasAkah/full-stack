import React, {useState, useRef} from 'react'
import ResultModalComponent from "./ResultModal.jsx"

function PlayerComponent({difficulty, time}) {
    const [timeRemaining, setTimeRemaining] = useState(time * 1000);
    const dialogRef = useRef(null);
    const runningTimeRef = useRef(null);

    const timerActive = timeRemaining > 0 && timeRemaining < time * 1000;

    if(timeRemaining <= 0){
      clearInterval(runningTimeRef.current)
      dialogRef.current.open();
    }

    function handleReset(){
      setTimeRemaining(time * 1000);
    }

    function handleStart(){
      runningTimeRef.current =  setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10)
      }, 10);
    }

    function handleStop(){
      dialogRef.current.open();
      clearInterval(runningTimeRef.current)
    }
  return (
    <>
      <ResultModalComponent time = {time}  ref = {dialogRef} remainingTime = {timeRemaining}  onReset = {handleReset}/>
      <div className = "challenge">
        <h2>{difficulty}</h2>
        <p className = "challenge-time">{time} second{time > 1 ? 's' : ''}</p>
        <button onClick = {timerActive ? handleStop : handleStart}>{timerActive ? 'Stop Challenge' : 'Start Challenge'}</button>
        {timerActive ? <p className = "active">timer is running ...</p> : <p>Timer inactive</p>}
      </div>
    </>
  )
}

export default PlayerComponent
