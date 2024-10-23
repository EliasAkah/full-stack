import {useState, useEffect} from 'react'

export default function ProgressBar({time}) {
    const [remainingTime, setRemainingTime] = useState(time)
    useEffect(() => {
        const timeInterval = setInterval(() => {
            console.log("TIME INTERVAL")
            setRemainingTime(prevRemainingTime => prevRemainingTime - 10)
        }, 10);

        //set up the clean up function
        return () => {
            clearInterval(timeInterval)
        }

        }, [])
  return (
    <>
        <progress value = {remainingTime} max = {time} />
    </>
  )
}
