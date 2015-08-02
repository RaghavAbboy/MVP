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
			console.log('POST successful. response:',resp);
			objectArr = resp.data.statuses;
			console.log('tweets fetched:',objectArr.length);
			return objectArr;
		});
	}

	return {
		sendQuery : sendQuery
	};
});