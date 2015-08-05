var express = require('express');
var keys = require('./config/keys.js');
var request = require('request');
var Twit = require('twit');
var middleware = require('./config/middleware.js');
var http = require('http');
var fs = require('fs');

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
	      //console.log('Omdb data - BODY: ' + body);
		  res.send(200, body);
	    });
	});
});


//GRAPH DATA INITIALIZATION
var movies = require('./movieList.js');
// var scores = require('./metascores.js');

var movieProfitHash = require('./movie_profits.js');
var movieMetascoreList = require('./movie_metascore.js');


//Fetch and store the metascore for all the movies
var initialize = function() {
	//console.log(movies.list);
	for(var i=4801; i<=4800; i++) {
		var currMovie = movies.list[i]["Movie"];
		var url = 'http://www.omdbapi.com/?t='+ currMovie;
		//GET request
		http.get( url, function (response) {
		    var body = '';
		    response.on('data', function (chunk) {
		      body += chunk;
		    });
		    response.on('end', function () {
		      //console.log('Omdb data - BODY: ' + typeof body);
		      var json = JSON.parse(body);
		      //console.log(json);
		      fs.appendFile('metascores.tsv', json["Title"] + '\t' + json["Metascore"] + '\n');  
		    });
		});
	}
}

// initialize();
var gendata = function() {
	//iterate through movie_metascore list 
	//if theres a valid metascore
		//use the hash to map the profit to the metascore as "label":metascore, "value":profit
	//else continue
	var arr = new Array(100);
	for(var i=0; i<100; i++) { arr[i] = []; }

	var count = 0;
	var mmlist = movieMetascoreList.list;
	for(var i=0; i<mmlist.length; i++) {
		try{
			var num = JSON.parse(mmlist[i]["metascore"]);
			if(typeof num === "number") {
				console.log('number, count=',count++);
				//Try the hashmap to fetch the movie
				var movie = mmlist[i]["Title"];
				var metascore = mmlist[i]["metascore"];
				var profit = movieProfitHash[movie];

				console.log('Movie:', movie);
				// console.log('Metascore:',metascore);
				// console.log('Profit:', profit);

				//make tuples in order from 0 to 100
				var tuple = [];
				tuple.push(metascore);
				tuple.push(profit);
				console.log(tuple);
				arr[metascore].push(tuple);

				//write to the file
				//fs.appendFile('./metascore_profits.js', '{"label":' + metascore + ',"value":' + profit + '},');

			}
		} catch(err) {
			console.log('Error!');
		}
	}//end of for loop

	//write to the file
	for(var i=0; i<arr.length; i++) {
		if(arr[i].length === 0) { 
			fs.appendFile('./metascore_profits.js', '{"label":' + i + ',"value":' + 0 + '},');
			continue;
		}

		for(var j=0; j<arr[i].length; j++) {
			//write to the file
			fs.appendFile('./metascore_profits.js', '{"label":' + arr[i][j][0] + ',"value":' + arr[i][j][1] + '},');
		}
	}

}	

gendata();


module.exports = app;

















