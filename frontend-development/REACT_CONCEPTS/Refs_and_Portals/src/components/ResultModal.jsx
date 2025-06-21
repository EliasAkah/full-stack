import {forwardRef, useImperativeHandle, useRef} from 'react';
import React from "react-dom"

const ResultModalComponent = forwardRef(function ResultModal({time, remainingTime, onReset}, ref) {
    const dialogRef =  useRef()

    const timeRemaining = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / ( time * 1000)) * 100);

  useImperativeHandle(ref, () => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    return {
      open(){
        dialogRef.current.showModal();
      }
    }
  }, [])
  return React.createPortal(
      <dialog className = "result-modal" ref = {dialogRef}>
        <h2>{remainingTime <= 0 ? 'You Loss' : `Your score: ${score}`}</h2>
        <p>The target time was <strong>{time} second{time > 1 ? 's' : ""}</strong></p>
        <p>You stopped the time with {timeRemaining} <strong>second{time > 1 ? 's' : ""} left</strong></p>
        <form method = "dialog" onSubmit = {onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.querySelector("#modal")
    )
})

export default ResultModalComponent
