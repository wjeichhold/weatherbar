var request = require('request');
var weatherKey = require('../config.js').weatherKey

const weatherHelper = (lat, long, callback) => {

  request(`https://api.darksky.net/forecast/${weatherKey}/${lat},${long}`, (err, res, body) => {
    var body = JSON.parse(body);
    callback(body)
  })

}


module.exports.weatherHelper = weatherHelper;