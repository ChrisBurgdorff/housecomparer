var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var houseController = require('./server/controllers/house-controller.js');

app.use(express.static(__dirname + "/public"));

app.get('/house', function(req, res){
	console.log("I recieved the get request.");
	var house1 = {
		address: '608 Main St, Belmar, NJ 07719',
		belmar: '14:52',
		mountainside: '24:52',
		tomsRiver: '54:52',
		station: 'Aberdeen-Matawan',
		toTrain: '14:52',
		newYork: '45:00'
	};
	var house2 = {
		address: '2310 2nd Ave, Lakehurst, NJ 05510',
		belmar: '38:52',
		mountainside: '38:52',
		tomsRiver: '38:52',
		station: 'Hoboken Terminal',
		toTrain: '08:52',
		newYork: '01:10:00'
	};
	var house3 = {
		address: '400 Boardwalk, Atlantic City, NJ 08855',
		belmar: '38:52',
		mountainside: '24:52',
		tomsRiver: '14:52',
		station: 'Asbury Park',
		toTrain: '05:52',
		newYork: '01:05:00'
	};
	var houseList = [house1, house2, house3];
	res.json(houseList);
});

mongoose.connect('mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb');

app.listen(process.env.PORT || 3000, function(){
	console.log("Application is listening on port 3000, or whatever.");
});