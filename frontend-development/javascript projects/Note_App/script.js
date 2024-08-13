const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

// Load existing notes and add them to the DOM. ensures elements are saved before reload
getNotes().forEach((note) => {
    const noteEl = createNote(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
})

function createNote(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "Empty Note";
    element.value = content;
    
    element.addEventListener("dblclick", () => {
        const warning =  confirm("Do you want to delete this note?");
        if(warning){
            deleteNote(id, element);
        }
    })

     // Adds an input event listener to the textarea. listens to the changes in the value/content of the textarea.
    element.addEventListener("input", () => {
        updateNote(id, element.value);
    })

    return element;
}

function deleteNote(id, element){
    const notes = getNotes().filter((note) => note.id != id);// Filters out the note with the given id from the list of notes
    saveNotes(notes);
    appEl.removeChild(element);
}

function updateNote(id, content){
    const notes = getNotes();
    const target = notes.filter((note) => note.id == id)[0];// Finds the note with the matching id
    target.content = content;
    saveNotes(notes);
}

function addNote(){
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }
    const noteEl = createNote(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj);
    saveNotes(notes);

}

// Converts the notes array to a JSON string and stores it in local storage under the key 'note-app'
function saveNotes(notes){
    localStorage.setItem("note-app", JSON.stringify(notes));
}

// Retrieves the notes from local storage, parsing the JSON string back into an array. If no notes are found, returns an empty array
function getNotes(){
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote);

