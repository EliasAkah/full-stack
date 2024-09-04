import React from 'react'
import Button from './Button.jsx'

function SideBar({handleAddProject, projects}) {
  return (
    <div className = "bg-black h-screen w-1/3 rounded-tr-3xl px-horizPadding py-vertPadding " >
        <h1 className = "font-bold uppercase text-white mt-4 tracking-wide">
          Your Projects
        </h1>
        <div>
          <Button onClick = {handleAddProject}>+ Add Project</Button>
        </div>
          <ul className = "mt-8">
            {projects.map((project) => ( 
              <li>
                <button key = {project.id} className = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-800 ">
                  {project.title}
                </button>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default SideBar

