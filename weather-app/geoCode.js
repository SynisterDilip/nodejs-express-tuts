const request = require('request');

var geoCodeAddress = (address, callback) =>{
	
	request({
		url: 
		json: true
	}, (error, response, body) => {
			if(error){
				callback('Could not connect to the google servers. Please try again later.');
			} else if(body.status === 'ZERO_RESULTS') {
				callback('Location not found. Please try a valid address.');
			} else if(body.status === 'REQUEST_DENIED') {
				console.log('Program error: Request Denied. The provided API key is expired.');
			} else if(body.status === 'OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
		})
};
module.exports = {
	geoCodeAddress
};


//846f9c86d609f314787b627b82019e49

//https://api.darksky.net/forecast/846f9c86d609f314787b627b82019e49/37.8267,-122.4233