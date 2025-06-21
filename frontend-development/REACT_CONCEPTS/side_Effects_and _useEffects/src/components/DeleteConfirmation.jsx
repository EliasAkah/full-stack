import {useEffect, useState} from  "react"
import ProgressBar from "./ProgressBar.jsx"

//defining TIMER outside function component to ensure that it can be used on any part of the function component
const TIMER =  3000

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('TIME OUT')
    const modalTimeout = setTimeout(() => {
      onConfirm();
    }, 3000)

    //writing the cleanUp function
    return () =>{
      console.log('cleaning up timer');
      clearTimeout(modalTimeout)
    }
  }, [onConfirm])

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <ProgressBar time = {TIMER} />
    </div>
  );
}
