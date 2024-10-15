import {useState, useEffect} from 'react'

export default function QuestionTimer({timeout, onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout)

    //wrapping the setTimeout in a useEffect hook, since the change in react state would lead to changes in its parameter
    useEffect(() => {
        console.log('SET TIMEOUT')
        setTimeout(onTimeout, timeout)
    }, [onTimeout, timeout])

    useEffect(() => {
        //Updating the Remaining time at every 100 milliSeconds
        console.log('SET TIMEINTERVAL')
        setInterval(() => {
            setRemainingTime(prevTime => {
                return prevTime - 100;
            })
        }, 100)
    }, [])
  return<progress id = "time-out" max ={timeout} value={remainingTime} />
}
