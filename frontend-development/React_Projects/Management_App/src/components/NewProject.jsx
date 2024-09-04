import Input from "./Input.jsx"
import {useRef, useState} from "react"

function NewProject({onAdd}) {

    const titleRef =  useRef();
    const DescriptionRef =  useRef()
    const dateRef =  useRef()

    function handleSave(){
      const enteredTitle = titleRef.current.value;
      const enteredDescription =  DescriptionRef.current.value
      const enteredDate =  dateRef.current.value;
      
      onAdd(
        {
          title: enteredTitle,
          description: enteredDescription,
          date: enteredDate
        }
      );
    }

  return(
    <div className = "flex flex-col justify-center items-center h-full w-2/3">
       <div className = "w-full ml-divMargin">
          <p className = "flex justify-end w-10/12">
                <button className = "bg-transparent text-black px-5 py-2 tracking-wider">Cancel</button>
                <button className = "bg-black w- text-white px-5 py-2 rounded-sm tracking-wider" onClick = {handleSave}>Save</button>
          </p>
          <Input ref = {titleRef} label = "Title" type = "text" />
          <Input ref = {DescriptionRef} label = "Description" textarea/>
          <Input ref = {dateRef} label = "Due-Date" type = "date"/>
       </div>
    </div>
  )
}

export default NewProject
