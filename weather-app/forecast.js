const request = require('request');

const token = '846f9c86d609f314787b627b82019e49';
var getWeatherReport = (latitude, longitude, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${token}/${latitude},${longitude}`,
		json: true
	}, function(error, response, body){
		if(!error || response.statusCode === 200){
			callback(undefined, {
				weather: body.currently.summary,
				currentTemperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature
			});
		} else{
			callback('Could not fetch weather.');
		}
	});
};

module.exports = {
	getWeatherReport
}
