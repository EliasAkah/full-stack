import { useState, useEffect } from "react"

export default function ProgressBar({timer}){
  const [remainingTime, setRemainingTime] = useState(timer)

  useEffect(() => {
    //remove the 10 milliseconds from the PrevTimer at every 10 millisecond
    const Interval = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 10)
    }, 10)

    return () => {
      clearInterval(Interval);
    }
  }, [])

  return <progress value = {remainingTime} max = {timer}/>
}