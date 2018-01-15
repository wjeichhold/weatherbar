var request = require('request');

const weatherHelper = (lat, long, callback) => {

  request(`https://api.darksky.net/forecast/${process.env._weatherKey}/${lat},${long}`, (err, res, body) => {
    var body = JSON.parse(body);
    callback(body)
  })

}


module.exports.weatherHelper = weatherHelper;