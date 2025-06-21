import {useState, useEffect} from  "react";

export default function QuestionTimer({timeOut, onTimeOut, mode}){
    const [remainingTime, setRemainingTime] = useState(timeOut)

    useEffect(() => {
        console.log("SETTING TIMEOUT")
        const TimeOut = setTimeout(onTimeOut, timeOut)
        
        return () =>{
            clearTimeout(TimeOut);
        }
    }, [timeOut, onTimeOut])
    
    
    useEffect(() => {
        console.log("SETTING TIMEINTERVAL")
        const timeInterval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100)
        }, 100)

        return () => {
            clearInterval(timeInterval)
        }
    }, [])
    return <progress id = "question-time" value = {remainingTime} max = {timeOut} className = {mode}/>
}