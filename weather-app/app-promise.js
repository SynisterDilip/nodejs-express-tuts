const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to be defined for weather forcasting.',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

var encodeAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyA-LucAh6xEyRKG2dDcrLDOa9Woxd5b0XM`;

axios.get(geoCodeUrl).then((response) => {
	if(response.data.status === 'ZERO_RESULTS'){
		throw new Error('Unable to find the address.');
	}

	var token = '846f9c86d609f314787b627b82019e49';
	var latitude = response.data.results[0].geometry.location.lat;
	var longitude = response.data.results[0].geometry.location.lng;
	var weatherURL = `https://api.darksky.net/forecast/${token}/${latitude},${longitude}`;
	
	console.log('Address Found');
	console.log(response.data.results[0].formatted_address);
	console.log('-------------');

	return axios.get(weatherURL);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;

	console.log(`It's currenthy ${temperature} but it feels like ${apparentTemperature}.`);
}).catch((e)=> {
	if(e.code === 'ENOTFOUND'){
		console.log('Unable to connect API servers.');
	}else{
		console.log(e.message);
	}
});
