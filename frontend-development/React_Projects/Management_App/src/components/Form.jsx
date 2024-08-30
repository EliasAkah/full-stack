import  {useState, useEffect} from 'react'
import React from "react-dom"

function Form() {
  const [addProject, setAddProject] = useState(false);

  function updateAddProject(){
    setAddProject(true);
  }

useEffect(() => {
    updateAddProject();
  }, []); 
  return React.createPortal(
    <div className = "flex w-full h-full">
      {/* <button onClick = {updateAddProject}>Turn On add Project</button> */}
      <div className = "bg-black w-div1Width h-div1Height rounded-tr-3xl px-horizPadding mt-divMargin py-vertPadding " >
        <h1 className = "font-bold uppercase text-white mt-4">Your Projects</h1>
        <button className = "bg-secondary py-2 px-2 capitalize mt-8  rounded-xl">+ Add Project</button>
      </div>
      { 
        (addProject) ?
          <div className = "flex flex-col justify-center items-center h-full w-div2Width ">
            <img src="../../logo.png" alt="note book" className = "w-12 h-12 mt-4" />
            <h1 className = "font-bold capitalize mt-4">No project selected</h1>
            <p className='mt-4'>Select a project or get started with a new one</p>
            <p>
            <button className = "bg-primary py-3 px-3 text-gray-400 capitalize w-buttonWidth h-buttonHeight rounded-xl m-5">Create new project</button>
            </p>
          </div>
          :
          <div className = "flex flex-col justify-center items-center h-full w-div2Width ">
              <form action="Submit"  method = "post">
                <p>
                  <button className = "bg-transparent text-black px-4 py-4">Cancel</button>
                  <button className = "bg-black text-white px-4 py-4 rounded-xl">Save</button>
                </p>
              </form>
          </div>
        }      

    </div>,
    document.querySelector("body")
  )
}

export default Form
