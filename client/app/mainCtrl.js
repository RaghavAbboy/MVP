angular.module('trendline',['trendline.services'])
.controller('mainController', ['Comm', function (Comm){
	var main = this;
	main.searchInput = '';

	main.statuses = {};

	main.submit = function() {
		console.log('main.submit says: Submitted. Searched for:', main.searchInput);
		Comm.sendQuery(main.searchInput)
		.then(function (objectArr){
			//Make an JSON object of the statuses
			//console.log('main.submit says:',objectArr);
			main.map(objectArr);
		});
	}

	main.map = function(objectArr) { 
		for(var i=0; i<objectArr.length; i++) {
			main.statuses[i+''] = {
				text: objectArr[i].text,
				time: objectArr[i].created_at.split('').slice(0,10).join('')
			}
		}
	}

}]);