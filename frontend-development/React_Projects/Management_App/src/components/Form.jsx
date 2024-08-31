import  {useState, useEffect} from 'react'
import React from "react-dom"
import SideBar from "./SideBar.jsx"

function Form() {
  const [addProject, setAddProject] = useState(false);

  function updateAddProject(){
    setAddProject(true);
  }

  return React.createPortal(
    <div className = "flex w-full h-full">
      {/* <button onClick = {updateAddProject}>Turn On add Project</button> */}
      <SideBar updateProject = {updateAddProject} />
      { 
        (addProject) ?
          <div className = "flex flex-col justify-center h-full w-div2Width ">
            <form action="Submit"  method = "post" className = "w-full ml-divMargin">
              <p className = "flex justify-end w-10/12">
                <button className = "bg-transparent text-black px-5 py-2 tracking-wider">Cancel</button>
                <button className = "bg-black w- text-white px-5 py-2 rounded-sm tracking-wider">Save</button>
              </p>

              <p className = "w-10/12">
                <label htmlFor="tile" className = "uppercase block flex-1 w-full font-semibold ">Title</label>
                <input type = "text" className = "bg-neutral-400 flex-1 w-full focus:outline-none focus:border-b-2 border-0 focus:border-bottomColor focus:text-amber-950 mb-4" />               
              </p>

              <p className = "w-10/12">
              <label htmlFor="tile" className = "uppercase block flex-1 w-full font-semibold">Description</label>
              <textarea name="comment"  className='bg-neutral-400 flex-1 w-full focus:outline-none focus:border-b-2 border-0 focus:border-bottomColor focus:text-amber-950 mb-4'></textarea>
              </p>

              <p className = "w-10/12">
              <label htmlFor="date" className = "uppercase block flex-1 w-full font-semibold">Due Date</label>
              <input type = "date" className = "bg-neutral-400 flex-1 w-full focus:outline-none focus:border-b-2 border-0 focus:border-bottomColor focus:text-amber-950" placeholder='dd.mm.yyy'/> 
              </p>
            </form>
          </div>
          :
          <div className = "flex flex-col justify-center items-center h-full w-div2Width ">
            <img src="../../logo.png" alt="note book" className = "w-16 h-16 mt-4" />
            <h1 className = "font-bold capitalize mt-4 text-3xl" tracking-wide>No project selected</h1>
            <p className='mt-4 text-xl tracking-wide'>Select a project or get started with a new one</p>
            <p>
            <button className = "bg-primary py-3 px-3 text-gray-400 capitalize w-buttonWidth h-buttonHeight rounded-xl m-5 tracking-wide">Create new project</button>
            </p>
          </div>
        }      

    </div>,
    document.querySelector("body")
  )
}

export default Form
