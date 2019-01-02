// Read existing notes from localStorage
const getSavedNotes = function () {
    // Check for existing saved data
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON !== null) {
        return JSON.parse(notesJSON) 
    } else {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const removeNote = function (id) {
    // Find the index of the note to remove
    const noteIndex = notes.findIndex( function (note) {
        return id === note.id
    })

    if (noteIndex > -1) {    
        // Delete the note
        notes.splice(noteIndex, 1)
    }
}

// Updates the tiemframe of when the note was last edited
const generateLastEdited = function (editedTimestamp) {
    return `Last Edited: ${moment(editedTimestamp).fromNow()}`
}

// Generate the DOM structure for a note
const generateNoteDOM = function (note) {
    const noteEl = document.createElement('div')
    noteEl.className = 'note'
    const textEl = document.createElement('a')
    const deleteEl = document.createElement('button')

    // Setup the remove note button
    deleteEl.textContent = 'X'
    noteEl.appendChild(deleteEl)

    // When remove button is clicked delete the note
    deleteEl.addEventListener('click', function (e) {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    const noteTitle = note.title
    if (noteTitle.length > 0) {
        textEl.textContent = noteTitle
    } else {
        textEl.textContent = 'Unamed Note'
    }
    
    noteEl.appendChild(textEl)
    textEl.setAttribute('href', `/edit.html#${note.id}`)

    return noteEl
}

// Sort your notes by one of three ways
const sortNotes = function (notes, sortBy) {
    if (sortBy === 'byEdited') {
        return notes.sort( function (a, b) {
            if (a.editedAt > b.editedAt) {
                return -1
            } else if (a.editedAt < b.editedAt){
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort( function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort( function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

// Render Application Notes
const renderNotes = function (notes, filters) {
    // Sort the notes
    notes = sortNotes(notes, filters.sortBy)
    // Filter the notes by search input
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })


    document.querySelector('#notes').innerHTML = '' // clears previously rendered notes

    filteredNotes.forEach(function (note) {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}