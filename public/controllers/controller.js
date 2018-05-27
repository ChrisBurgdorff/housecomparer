var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {
	console.log("in controller.js");
	$http.get('/house').success(function(response){
		console.log("Got into request");
		$scope.houseList = response;
	});	
}]);
