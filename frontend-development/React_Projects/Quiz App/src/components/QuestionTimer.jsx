import {useState, useEffect} from 'react'

export default function QuestionTimer({timeout, onTimeout, mode}) {
    const [remainingTime, setRemainingTime] = useState(timeout)

    //wrapping the setTimeout in a useEffect hook, since the change in react state would lead to changes in its parameter
    useEffect(() => {
        console.log('SET TIMEOUT')
        const timer = setTimeout(onTimeout, timeout)

        return () => clearTimeout(timer)

    }, [onTimeout, timeout])

    useEffect(() => {
        //Updating the Remaining time at every 100 milliSeconds
        console.log('SET TIMEINTERVAL')
        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                return prevTime - 100;
            })
        }, 100)

        //react clean up function that prevents setInterval from occuring twice and therefore prevents the progress bar from
        //completely depleting before the end of the allocated time.
        return () => clearInterval(interval)
    }, [])
  return<progress id = "time-out" max ={timeout} value={remainingTime} className= {mode} />
}
