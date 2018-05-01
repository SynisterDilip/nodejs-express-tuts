const request = require('request');

var geoCodeAddress = (address) =>{
	return new Promise((resolve, reject) => {
		var encodeAddress = encodeURIComponent(address);
		
		request({
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyA-LucAh6xEyRKG2dDcrLDOa9Woxd5b0XM`,
			json: true
		}, (error, response, body) => {
				if(error){
					reject('Could not connect to the google servers. Please try again later.');
				} else if(body.status === 'ZERO_RESULTS') {
					reject('Location not found. Please try a valid address.');
				} else if(body.status === 'REQUEST_DENIED') {
					reject('Program error: Request Denied. The provided API key is expired.');
				} else if(body.status === 'OK') {
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					});
				}
			})
	});
};

var NewAddress = '00000';

geoCodeAddress(NewAddress).then((location) => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
})






// var somePromise = new Promise(function(resolve, reject){
// 	setTimeout(function(){
// 		resolve('It worked.');
// 	}, 3000);
// });
// somePromise.then((message) => {
// 	console.log('Success: ', message);
// }, (errorMessage) => {
// 	console.log('Error: ', errorMessage);
// });