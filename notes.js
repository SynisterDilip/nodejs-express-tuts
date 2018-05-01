const fs = require('fs');

var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync('notes-data.json');
		return JSON.parse(noteString);
	} catch(e) {
		return [];
	}
};

var saveNotes = (notes) =>  {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};

	var duplicateNotes = notes.filter((note) => note.title === title);
	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
	else{
		console.log("---------------------------------");
		console.log('Note with dupicate title entered.');
	}
};

var getAll = ()=> {
	return fetchNotes();
};

var getNote = (title)=> {
	var notes = fetchNotes();
	var FilteredNotes = notes.filter(function(note){
		return note.title === title;
	});
	return FilteredNotes[0];
};

var removeNote = (title)=> {
	//fetching notes
	var notes = fetchNotes();
	//Finding and deleting the note
	var FilteredNotes = notes.filter(function(note) {
		return  note.title !== title;
	});
	saveNotes(FilteredNotes);

	return notes.length !== FilteredNotes.length;
};

var logNote = (note) => {
	console.log('-------------------------');
	console.log(`Title : ${note.title}`);
	console.log(`Body : ${note.body}`);
}
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};
