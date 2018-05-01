var http = require('http');
var date = require('./date');
var url = require('url');
var fs = require('fs');
var x = 8585;
var MyServer = http.createServer((request, response) =>{
	response.writeHeader(200, {"Content-type" : "text/html"});
	// response.write("jfkslfjkaslfjas" + date.myDateTime());
	// response.write(request.url);
	var q = url.parse(request.url, true).query;
	var txt = q.year + " " + q.month;
	response.end(txt);
});
MyServer.listen(x);
console.log('Port opened at ' + x);