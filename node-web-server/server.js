const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrebtYear', () => {
	return new Date().getFullYear();
});

app.use((request, response, next) => {
	var Current = new Date().toString();
	var log = (`${Current} : ${request.method} ${request.url}`);
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});

	next();
});

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

// app.get('/maintenance', function(request, response) {
// 	response.render('maintenance.hbs');
// });

app.get('/', function(request, response) {
	response.render('home.hbs', {
		pageTitle: 'Home page',
	});
});

app.get('/about', function(request, response){
	response.render('about.hbs', {
		pageTitle: 'About page',
	});
});

app.get('/error', (request, response) => {
	response.send({
		error: 'Error 404',
		message: 'Page not found'
	});
});



app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});