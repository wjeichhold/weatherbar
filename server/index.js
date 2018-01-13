var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var yelpHelper = require('./yelpHelper').yelpGetter;
var weatherHelper = require('./weatherHelper').weatherHelper;

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/recommendations', function (req, res) {
  weatherHelper(req.body.lat, req.body.long, (weather) => {
  	var temp = weather.currently.apparentTemperature;
  	var icon = weather.minutely.icon;
  	var lat = req.body.lat;
  	var long = req.body.long;
  	console.log(temp, icon)
  	yelpHelper(temp, icon, lat, long, (data) => {
  		res.send(data)
  	});
  });
});

app.post('/weather', function(req, res) {
  weatherHelper(req.body.lat, req.body.long, (weather) => {
    var temp = weather.currently.apparentTemperature;
    var summary = weather.minutely.summary;
    var weatherArr = [temp, summary]
    res.send(weatherArr)
  })
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

