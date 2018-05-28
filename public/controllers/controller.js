var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {
	console.log("in controller.js");
	$http({
		method: 'GET',
		url: '/house'
	}).then(function(response) {
		console.log("Got into request");
		console.log(response);
		//$scope.houseList = response;
    $scope.houseList = [{address: 'sdfsd', belmar: 'dfv34'}];
	}, function (error) {
		console.log(error);
	});
}]);
