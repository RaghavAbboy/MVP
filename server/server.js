var express = require('express');
var keys = require('./config/keys.js');
var request = require('request');
var Twit = require('twit');
var middleware = require('./config/middleware.js');
var http = require('http');

var T = new Twit({
    consumer_key: keys.consumerKey
  , consumer_secret: keys.consumerSecret
  , access_token: keys.accessToken
  , access_token_secret: keys.accessTokenSecret
})

app = express();
middleware(app,express);

// NOTE: still don't fully understand the necessity of `__dirname` and how it's used
app.use(express.static(__dirname + '/../client'));
// require('./config/middleware.js');

//Handle a POST request
app.post('/getData', function(req, res) {
	var searchQuery = req.body.query;
	//console.log('POST request for tweets received. query:',searchQuery);

	T.get('search/tweets', {
	 q: searchQuery + ' since:2014-05-05',
	 count: 100 },
	 function(err, data, response) {
	 	//console.log('Data from twitter:',data)
	 	res.send(data);
	 });
});

//Handle a omdb fetch request
app.post('/getOmdb', function(req,res) {
	var movie = req.body.movie;
	console.log('POST request for Omdb received. movie:', movie);

	//Make a GET request to Omdb
	var url = 'http://www.omdbapi.com/?t='+ movie + '&tomatoes=true';
	http.get( url, function (response) {
	    var body = '';
	    response.on('data', function (chunk) {
	      body += chunk;
	    });
	    response.on('end', function () {
	      console.log('Omdb data - BODY: ' + body);
		  res.send(200, body);
	    });
	});
});

module.exports = app;

















