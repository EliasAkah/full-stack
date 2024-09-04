import {useState, useRef} from "react"
import NoProject from "./components/NoProject.jsx"
import SideBar from "./components/SideBar.jsx"
import NewProject from "./components/NewProject.jsx"

function App() {
  const [addProject, setAddProject] = useState({
    SelectedProjectId: undefined,
    projects: [],
  })// selected projec id is set to undefined when no project is created, null when a project is created, and a value when a project is selected

  //rendering a jsx conditionally when project is created or not
  function handleStartAddProject(){
    setAddProject((prevProjects => {
      return{
        ...prevProjects,
        SelectedProjectId: null
      }
    }))
  }

  function handleAddProject(project){
    let projectId = Math.random()
    const newProject = {
      ...project,
      id: projectId
    }

    setAddProject(prevProject => {
      return{
        ...prevProject,
        SelectedProjectId: undefined,
        projects: [...prevProject.projects, newProject]
      }
    })
  }

  let content;

  if(addProject.SelectedProjectId === null){
    content = <NewProject onAdd = {handleAddProject}/>
  }else{
    content = <NoProject handleAddProject = {handleStartAddProject} />
  }

  console.log(addProject);

  return (
    <main className = "flex w-full h-full mt-7">
      <SideBar handleAddProject = {handleStartAddProject} projects = {addProject.projects}/>
      {content}
    </main>
  );
}

export default App;
