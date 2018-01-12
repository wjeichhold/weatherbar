var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var yelpHelper = require('./yelpHelper').yelpHelper;
var weatherHelper = require('./weatherHelper').weatherHelper;

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.post('/recommendations', function (req, res) {
  weatherHelper(req.body.lat, req.body.long, (data) => 
    {yelpHelper(data, (yelpData) => 
      {res.send(yelpData)
    }) 
  })
  console.log(req.body)
  res.send('hiii')
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

