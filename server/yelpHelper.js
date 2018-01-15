var request = require('request');
var saver = require('../database-mongo/index.js');

var yelpGetter = function(temp, icon, lat, long, callback) {

  var goodWeather = ['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night', 'cloudy']

  var options = {
  url: `https://api.yelp.com/v3/businesses/search?term=dive_bar&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`,
  headers: {
    'Authorization': `Bearer ${process.env.yelpKey}`
    }
  }

  if (temp < 30 && (Math.random()*3 > 2)) {
    options.url = `https://api.yelp.com/v3/businesses/search?term=fireplace&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
    } else 

  if (temp < 30 && (Math.random()*3 > 1)) {
    options.url = `https://api.yelp.com/v3/businesses/search?term=cozy&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
  } else 

  if (temp < 30 && (Math.random()*3 > 0)) {
    options.url = `https://api.yelp.com/v3/businesses/search?term=cocktails&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
  } else 

  if (temp > 30 && temp < 50) {
  options.url = `https://api.yelp.com/v3/businesses/search?term=dive_bar&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
  } else

  if (temp > 60 && temp < 75 && (goodWeather.indexOf(icon) > -1)) {
    options.url = `https://api.yelp.com/v3/businesses/search?term=backyard&latitude=${lat}&longitude=${long}&limit=10&sort_by=distance&open_now=true&categories=bars`
  } 


  request(options, function(err, req, body) {
    var body = JSON.parse(body);
    var barArray = [];
    for (var i = 0; i < body.businesses.length; i++) {
      var newObj = {
        pictureUrl: body.businesses[i].image_url,
        bizName: body.businesses[i].name,
        bizUrl: body.businesses[i].url,
        coords: body.businesses[i].coordinates,
        address: body.businesses[i].location.display_address
      }
      barArray.push(newObj)
    }
    callback(barArray)
  })
    
}

module.exports.yelpGetter = yelpGetter;
