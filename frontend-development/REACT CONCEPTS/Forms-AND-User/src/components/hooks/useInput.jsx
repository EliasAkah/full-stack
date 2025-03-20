import {useState} from "react"

export function useInput(initialValue, validationFn){
    const [enteredValue, setEnteredValue] = useState(initialValue);

    const [didEdit, setDidEdit] = useState(false);

    const isValid = validationFn(enteredValue)

    function handleInputChange(event) {
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleOnBlur() {
        setDidEdit(true);
    }

    return{
        value: enteredValue,
        handleInputChange,
        handleOnBlur,
        hasError: didEdit && !isValid
    }
}