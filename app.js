const notes = require('./notes.js');
// const result = notes.sum(4,5);
console.log("---------------------------------");

const yargs = require('yargs');


const titleOptions = {
	describe: 'Title of the note',
	demand: true,
	alias: 't'
} 

const bodyOptions = {
	describe: 'Content part of the note',
	demand: true,
	alias: 'b'
}

const argv = yargs
	.command('add', 'Add a new note', {title : titleOptions,body: bodyOptions})
	.command('list', 'list all notes')
	.command('read', 'Read a note', {title: titleOptions})
	.command('remove', 'Remove a note', {title: titleOptions})
	.help()
	.argv;
var command = argv._[0];

if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('Note created successfully');
		notes.logNote(note);
	}
} else if(command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s)`);
	allNotes.forEach((note) => notes.logNote(note));
} else if(command === 'read'){
	var note = notes.getNote(argv.title);
	if(note){
		console.log('Note found.');
		notes.logNote(note);
	}
	else{
		console.log('-------------------------');
		console.log(`Note named ${argv.title} not found`);
	}
} else if(command === 'remove'){
	var bool = notes.removeNote(argv.title);
	if(bool){
		console.log('-------------------------');
		console.log('1 Note removed.');
		console.log(`Title : ${argv.title}`);
	}
	else{
		console.log('-------------------------');
		console.log(`Note named ${argv.title} not found`);
	}
} else {
	console.log('Invalid input.');
}

