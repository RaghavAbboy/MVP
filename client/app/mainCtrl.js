angular.module('trendline',['trendline.services'])
.controller('mainController', ['Comm', function (Comm){
	var main = this;
	main.searchInput = '';

	main.submit = function() {
		console.log('main.submit says: Submitted. Searched for:', main.searchInput);
		Comm.sendQuery(main.searchInput);
	}
}]);