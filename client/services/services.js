angular.module('trendline.services',[])

.factory('Comm', function ($http) {
	var sendQuery = function(query) {
		//console.log('sendQuery called. query:',query);
		return $http({
			method: 'POST',
			url: '/getData',
			data: { query : query }
		})
		.then(function(resp) {
			console.log('POST successful. response:',resp);
		});
	}

	return {
		sendQuery : sendQuery
	};
});