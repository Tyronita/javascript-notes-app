# javascript-notes-app
A notes app made from vanilla JavaScript and 2 libraries(so far): UUID(https://github.com/kelektiv/node-uuid) and moment.js
(https://github.com/moment/moment).
The app allows a user to create, update and delete notes through a user interface which is manipulated through the DOM.

An individual note is an object containing 5 properties: the note's title, the note's body, the note's creation time, the note's last 
edited date and the note's universally unique identifier(UUID).
The note dates are created and manipulated through the moment.js library.
Note objects are stored in an array which is preserved in LocalStorage as it is stored as a stringified object and fetched via JSON.parse.
The notes array is sorted in three ways and a user can select the method of sorting.
The sorted notes are rendered and displayed by manipulating the DOM and can be filtered by a search input.

The user can create a note by clicking the create note button which redirects the user to the edit.html page with the parsed universally 
unique identifier in the url which is retrieved to identify the created note.
The method is also used for editing the note which updates live as the data syncs across tabs through an storage change event listener.

Note that the app is currently unstyled.
Made following a great Udemy course by Andrew Mead (https://www.udemy.com/modern-javascript/) and the first version was commited half way 
through following the course.
