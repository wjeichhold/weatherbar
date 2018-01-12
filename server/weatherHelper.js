var request = require('request');
var weatherKey = require('../config.js').weatherKey

const weatherHelper = (lat, long) => {

  request(`https://api.darksky.net/forecast/${weatherKey}/${lat},${long}`, (err, res, body) => {
    var body = JSON.parse(body);
    console.log(body.currently.apparentTemperature, body.minutely.icon)
  })

}


module.exports.weatherHelper = weatherHelper;