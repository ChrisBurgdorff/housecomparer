var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var houseController = require('./server/controllers/house-controller.js');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb";

app.use(express.static(__dirname + "/public"));

app.use(bodyParser());

app.get('/house', function(req, res){
	var houseList;
	console.log("I recieved the get request.");
	MongoClient.connect(MognoUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db("housecomparerdb");
		dbo.collection("houses").find({}, function(err, result) {
			if (err) throw err;
			console.log(result);
			houseList = result;
			db.close();
		});
	});
	//var houseList = [house1, house2, house3];
	res.json(houseList);
});

//mongoose.connect('mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb');

app.listen(process.env.PORT || 3000, function(){
	console.log("Application is listening on port 3000, or whatever.");
});