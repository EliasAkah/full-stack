import React, {useState} from 'react'



function Form() {
  const [addProject, setAddProject] = useState(false);

  function updateAddProject(){
    setAddProject(true);
  }

  updateAddProject();

    if(addProject){
        return (
            <div>
              <img src="../../public/logo.png" alt="note book" className = "" />
              <h2>No project selected</h2>
              <p>Select a project or get started with a new one</p>
              <button>Create new project</button>
            </div>
          )
    }else{
        return (
    
            <div>
              <form action="Submit"  method = "Post">
                <p>
                  <button>Cancel</button>
                  <button>Save</button>
                </p>
              </form>
            </div>
          )
    }

}

export default Form
