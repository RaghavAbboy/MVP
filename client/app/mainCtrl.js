angular.module('trendline').controller("mainController", function(){
	var main = this;
	main.searchInput = '';

	main.submit = function() {
		console.log('main.submit says: Submitted. Searched for:', main.searchInput);
	}
});