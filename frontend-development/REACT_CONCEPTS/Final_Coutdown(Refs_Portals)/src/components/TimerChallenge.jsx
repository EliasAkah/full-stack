import {useState, useRef} from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({title, targetTime}){
    //we use ref in place of variable because it stores it value in the background and does not loose it like state and at the same time
    //it does not cause re-execution of components. defining it within the component makes it component specific, mean that the timer ref variable
    //in one component is independent from that in other components.
    // the issue with normal variables is that when placed above the components all components shares a single timer variable causing an overhaul or
    // removal of previously existing value of the timer variable another component is triggered. When it is declared within the component the variable
    //re-executed each time the component is re-rendered making it loose the data it stored before the re-render
    const timer =  useRef();
    const dialogRef = useRef();

    const [timeRemaining,  setTimeRemaining] = useState(targetTime * 1000)

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    //auto clearing the time interval when "timerIsActive" is true or satisfied.
    if(timeRemaining <= 0){
        clearInterval(timer.current)//stops the timer before the allocated finishes
        dialogRef.current.open(); 
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000)
    }
    function handleStart(){
        timer.current = setInterval(() => {
            //reducing the remaining time every 10milsec
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
        }, 10)//updates the time immediately after the allocated time expires '10milsec'
    }

    //manually stoping the time interval. when we do this we win
    function handleStop(){
        dialogRef.current.open();
        clearInterval(timer.current)//the .current helps the ref to access the values of setTimeout.
    }

    return(
        <>
            <ResultModal  ref = {dialogRef} targetTime = {targetTime} remainingTime = {timeRemaining} onReset = {handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick = {timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className="">
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
            </>

    )
}