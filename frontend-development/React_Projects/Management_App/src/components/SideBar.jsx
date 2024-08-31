import React from 'react'
import {useState, useRef} from "react"

function SideBar({updateProject}) {
    const [projects, setProjects] = useState([])

    function handleProjectUpdate(){
        setProjects(prevProjects => [...prevProjects, title])
    }
  return (
    <div className = "bg-black w-div1Width h-div1Height rounded-tr-3xl px-horizPadding mt-divMargin py-vertPadding " >
        <h1 className = "font-bold uppercase text-white mt-4 tracking-wide">Your Projects</h1>
        <button className = "bg-secondary py-2 px-2 capitalize mt-8  rounded-xl tracking-wide " onClick = {updateProject}>+ Add Project</button>
    </div>
  )
}

export default SideBar

