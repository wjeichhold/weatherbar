var request = require('request');
var saver = require('../database-mongo/index.js');
var yelpKey = require('../config.js').yelpKey;

var yelpGetter = function(temp, icon, long, lat, callback) {

  if (temp < 30) {
    options.url = `https://api.yelp.com/v3/businesses/search?term=fireplace&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
    }

  if (temp > 30 && temp < 50) {
  options.url = `https://api.yelp.com/v3/businesses/search?term=dive_bar&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
  }  

  var options = {
    url: 'https://api.yelp.com/v3/businesses/search?term=' + term + '&latitude=' + lat + '&longitude=' + long + '&limit=9&sort_by=distance&open_now=true',
    headers: {
      'Authorization': `Bearer ${yelpKey}`
    }
  }


  request(options, function(err, req, body) {
    var body = JSON.parse(body);
    for (var i = 0; i < body.businesses.length; i++) {
      var newObj = {
        pictureUrl: body.businesses[i].image_url,
        bizName: body.businesses[i].name,
        bizUrl: body.businesses[i].url
      }
      saver.saver(newObj);
    }
  })
    callback('done')
}

module.exports.yelpGetter = yelpGetter;
