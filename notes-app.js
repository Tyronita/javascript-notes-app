let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

// When create note button is clicked
document.querySelector('#create-note').addEventListener('click', function (e) {
    const id = uuidv4() // Creates a universally unique identifier
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        createdAt: timestamp,
        editedAt: timestamp,
        title: '',
        body: ''
    })
    saveNotes(notes)
    location.assign(`edit.html#${id}`)
})

// updates the filter
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

// Executes once local storage is changed, called in the other tabs 
window.addEventListener('storage', function (e) {
    // Update the changes from local storage
    if (e.key==='notes') {
        notes = JSON.parse(e.newValue)//OR// notes = getSavedNotes('notes')
        renderNotes(notes, filters)
    }
})