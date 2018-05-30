var myApp = angular.module('myApp', []);myApp.controller('AppCtrl', ['$scope','$http', function($scope, $http) {	console.log("in controller.js");        var refresh = function() {        $scope.editing = false;        $http({            method: 'GET',            url: '/house'        }).then(function(response) {            console.log("Got into request");            console.log(response);            $scope.houseList = response;            $scope.fakeVar = "HELLO";        }, function (error) {            console.log(error);        });    };        refresh();        $scope.remove = function(id) {        console.log(id);        $http.delete('/house/' + id).then(function(response) {            refresh();        }, function (error) {            console.log(error);        });    };        $scope.edit = function(id) {        $scope.editing = true;        console.log(id);        $http.get('/house/' + id).then(function(response) {			console.log("RESPONSE: ");			console.log(response);            $scope.houseToEdit = response.data;        }, function (error) {            console.log(error);        });    };      $scope.update = function() {        console.log($scope.houseToEdit._id);        $http.put('/house/' + $scope.houseToEdit._id, $scope.houseToEdit).then(function(response) {            refresh();        }, function (error) {            console.log(error);        })    };    $scope.deselect = function() {        $scope.houseToEdit = "";        $scope.editing = false;    };}]);