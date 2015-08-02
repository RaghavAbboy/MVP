var express = require('express');
var keys = require('./config/keys.js');
var request = require('request');

app = express();

// NOTE: still don't fully understand the necessity of `__dirname` and how it's used
app.use(express.static(__dirname + '/../client'));
// require('./config/middleware.js');

//Twitter 
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: keys.consumerKey,
    consumerSecret: keys.consumerSecret,
    callback: 'http://127.0.0.1:3000/callback'
});


//Required for an access Token (OLD)
// var requestToken;
// var requestTokenSecret;
// var redirectUrl;

//Handle a GET request
app.get('/getData', function(req, res) {
	console.log('GET request received.');
	//console.log(twitter);

	//get a request token (OLD)
	// twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
	//     if (error) {
	//         console.log("Error getting OAuth request token : " + error);
	//     } else {
	//         //store token and tokenSecret somewhere, you'll need them later; redirect user 
	//         console.log('OAuth request token successfully received!')
	//         requestToken = requestToken;
	//         requestTokenSecret = requestTokenSecret;
	//         redirectUrl = twitter.getAuthUrl(requestToken);
	        
	//         console.log('requestToken:', requestToken);
	//         console.log('requestTokenSecret:', requestTokenSecret);
	//         console.log('Redirect URL:', redirectUrl);

	//         console.log('Redirecting to twitter...');
	//         //res.redirect(redirectUrl);
	//         res.redirect(redirectUrl);
	//     }
	// });

	//res.end();
});

//Handle callback from Twitter
// app.get('/callback', function (oauth_token, oauth_verifier) {
// 	console.log('Back from twitter.');
// 	//console.log('oauth_token:', oauth_token);
// 	//console.log('oauth_verifier:', oauth_verifier);
	
	//not working from herein below
// 	twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
// 	    if (error) {
// 	        console.log(error);
// 	    } else {
// 	        //store accessToken and accessTokenSecret somewhere (associated to the user) 
// 	        //Step 4: Verify Credentials belongs here 
// 	        console.log('accessToken received!!');
// 	    }
// 	});
// });




module.exports = app;

















