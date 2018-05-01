const fs = require('fs');

var originalNote = {
	title : 'Summer Love',
	body : 'Written by Subin Bhattarai'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof noteString);
console.log(note.title);