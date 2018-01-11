var request = require('request');
var saver = require('../database-mongo/index.js');

var yelpGetter = function(term, long, lat, callback) {
  var options = {
    url: 'https://api.yelp.com/v3/businesses/search?term=' + term + '&latitude=' + lat + '&longitude=' + long + '&limit=9&sort_by=distance&open_now=true',
    headers: {
      'Authorization': `Bearer ${process.env._apikey}`
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
