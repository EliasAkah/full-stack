import { forwardRef, useRef, useImperativeHandle } from "react";
import {createPortal} from 'react-dom'

 const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedTimeRemaining = (remainingTime / 1000).toFixed(2)
    //remainingTime is in millisecond and targetTime in seconds that is why i multiplied targetTime by 1000 to convert it to milliseconds
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)//round to a whole number

    useImperativeHandle(ref, () => {
        return{
            open(){
                dialog.current.showModal()
            }
        }
    })
    return createPortal(
        <dialog ref = {dialog} className = 'result-modal'>
           {userLost && <h2>You Lost</h2>}
           {!userLost && <h2>Your Score:{score}</h2>}
           <p>The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}</strong></p>
           <p>You stopped the tmer with <strong>{formattedTimeRemaining} second{targetTime > 1 ? 's' : ''} left.</strong></p>
           <form method="dialog" onSubmit={onReset}>
                <button>Close</button>           
           </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal;