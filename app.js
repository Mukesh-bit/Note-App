const btn = document.querySelector("#btn")
const appEl = document.querySelector("#app")

 
// CREATE NOTE ELEMENT FUNCTION
const createNoteEl = (id,content) => {
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"
    element.value = content

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?")
        if(warning) {
            deleteNote(id,element)
        }
    })

    element.addEventListener("input", () => {
        updateNote(id,element.value)
    })

    return element
}   

// DELETE NOTE FUNCTION
const deleteNote = (id, element) => {
    const notes = getNotes().filter((note) => note.id != id)
    saveNotes(notes)
    appEl.removeChild(element)
}

// UPDATE NOTE FUNCTION
const updateNote = (id, content) => {
    const notes = getNotes(); 
    const target = notes.filter((note) => note.id == id)[0]
    target.content = content
    saveNotes(notes) 
}

// ADD NOTE FUNCTION
const addNote = () => {
    const notes = getNotes()

    const noteObj={
        id: Math.floor(Math.random() * 100000),
        content: "",
    }

    const noteElm = createNoteEl(noteObj.id, noteObj.content)

    appEl.insertBefore(noteElm,btn)

    notes.push(noteObj)

    saveNotes(notes)
}

// SAVE NOTES FUNCTION
const saveNotes = (notes) => {
    localStorage.setItem("note-app", JSON.stringify(notes))
}

// GET NOTES FUNCTION
const getNotes = () => {
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}

// DISPLAY NOTES ON BROWSER FUNCTION
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content);
    appEl.insertBefore(noteEl, btn);
});

// ADD NOTE FUNCTION
btn.addEventListener("click", addNote)