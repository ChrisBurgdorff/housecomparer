var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {
	console.log("in controller.js");
	$http({
		method: 'GET',
    isArray: true,
		url: '/house'
	}).then(function(response) {
		console.log("Got into request");
		console.log(response);
		$scope.houseList = response;
	}, function (error) {
		console.log(error);
	});
}]);
