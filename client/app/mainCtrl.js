angular.module('trendline',['trendline.services'])
.controller('mainController', ['Comm', function (Comm){
	var main = this;
	main.searchInput = '';

	main.statuses = {};
	main.movieInfo = {};

	main.showInfo = false;
	main.hashtag = '';

	//***********************************************************************
	//GET THE SEARCH CRITERIA - MOVIE OF INTEREST, FETCH TWEETS
	//***********************************************************************

	main.submit = function() {
		console.log('main.submit says: Submitted. Searched for:', main.searchInput);
		if(main.searchInput !== '') {
			main.hashtag = '#' + JSON.parse(JSON.stringify(main.searchInput)).split(' ').join('');
			Comm.sendQuery(main.hashtag)
			.then(function (objectArr){
				//Make an JSON object of the statuses
				//console.log('main.submit says:',objectArr);
				main.map(objectArr);
			});

			Comm.getOmdb(main.searchInput)
			.then(function (resultObj) {
				//JSON of details expected
				console.log(resultObj);
				main.movieInfo = resultObj;
			});

			main.showInfo = true;
		}
		else {
			main.showInfo = false;
			main.statuses = {};
		}
	}

	//Get the latest 100 tweets from twitter based on main.searchInput
	main.map = function(objectArr) { 
		for(var i=0; i<objectArr.length; i++) {
			main.statuses[i+''] = {
				text: objectArr[i].text,
				time: objectArr[i].created_at.split('').slice(0,10).join('')
			}
		}
	}

	//***********************************************************************
	//A SIMPLE BAR GRAPH of Profit vs Metascore (0-100)
	//***********************************************************************














}]);