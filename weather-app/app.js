const yargs = require('yargs');

const geoCode = require('./geoCode');
const forecast = require('./forecast');

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

geoCode.geoCodeAddress(argv.address, function(address_fetch_error, addressResult){
	if(address_fetch_error){
		console.log(address_fetch_error);
	} else {
		console.log('Location found!');
		// console.log(JSON.stringify(addressResult, undefined, 2));
		console.log('---------------');
		forecast.getWeatherReport(addressResult.latitude, addressResult.longitude, function(weather_fetch_error, weatherResult){
			if(weather_fetch_error){
				console.log(weather_fetch_error);
			}
			else{
				console.log(`Weather - ${argv.address}  : ${weatherResult.weather}.`);
				console.log(`The current temperature is ${weatherResult.currentTemperature} but it feels like ${weatherResult.apparentTemperature}`);
			}
		});

	}
});







































//fdskfsdljfksdljfskdlfjsdklfjskl

// var getUser = (id, callback) => {
// 	var user={
// 		id: id,
// 		name: 'Dilip'
// 	};
// 	callback(user);
// };

// getUser(31, (userObject) => {
// 	console.log(userObject);
// });