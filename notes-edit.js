// retrieves id from url
const noteId = location.hash.substring(1)
// Retrieves notes from local storage
let notes = getSavedNotes()
// Finds the individual note
let note = notes.find( function (note) {
    return noteId === note.id
})
// Redirects to home if not supplied with an ID hash in url
if (note === undefined) {
    location.assign('/index.html')
}

const titleInput = document.querySelector('#note-title')
const bodyInput = document.querySelector('#note-body')
const removeButton = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

// If there is already data in the note load it into the inputs
titleInput.value = note.title
bodyInput.value = note.body
dateElement.textContent = generateLastEdited(note.editedAt)

// On note title input update and save the data
titleInput.addEventListener('input', function (e) {
    note.title = e.target.value
    note.editedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.editedAt)
    saveNotes(notes)
})

// On note body input update and save the data
bodyInput.addEventListener('input', function (e) {
    note.body = e.target.value
    note.editedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.editedAt)
    saveNotes(notes)
})

// Once remove button is clicked delete the note and redirect
removeButton.addEventListener('click', function () {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// Executes once local storage is changed, called in the other tabs 
window.addEventListener('storage', function (e) {
    // console.log('data change')
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
    }

    // Redirects to home if note not found (if deleted
    note = notes.find(function (note) {
        return noteId === note.id
    })
    if (note === undefined) {
        location.assign('/index.html')
    }

    // Updates data changes in other tabs in the inputs
    titleInput.value = note.title
    bodyInput.value = note.body
    dateElement.textContent = generateLastEdited(note.editedAt)

})