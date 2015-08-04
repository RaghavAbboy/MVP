angular.module('trendline.services',[])

.factory('Comm', function ($http) {
	var sendQuery = function(query) {
		var objectArr;
		//console.log('sendQuery called. query:',query);
		return $http({
			method: 'POST',
			url: '/getData',
			data: { query : query }
		})
		.then(function(resp) {
			//console.log('POST for tweets successful. response:',resp);
			objectArr = resp.data.statuses;
			//console.log('tweets fetched:',objectArr.length);
			return objectArr;
		});
	}

	//Fetch movie particulars from Omdb
	var getOmdb = function (movie) {
		var result;
		console.log('getOmdb service function called.');
		return $http({
			method: 'POST',
			url: '/getOmdb',
			data: { movie: movie }
		})
		.then(function(resp) {
			console.log('POST for movies successful. response:',resp);
			return resp;
		});
	}

	return {
		sendQuery : sendQuery,
		getOmdb : getOmdb
	};
});