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
	console.log("I RECIEVED THE GET REQUEST!!!!!!!!!");
	MongoClient.connect(MongoUrl, function(err, db) {
		if (err) {
			console.log(err);
		} else {
		console.log("INTO MONGO FUNCTION!!!!!!!!!!!!!!!!!!!!!!");
		var dbo = db.db("housecomparerdb");
		dbo.collection("houses").find({}, function(err, result) {
			if (err) throw err;
			console.log(result);
			houseList = result;
			db.close();
		});
		}
	});
	//var houseList = [house1, house2, house3];
	res.json(houseList);
});

//mongoose.connect('mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb');

app.listen(process.env.PORT || 3000, function(){
	console.log("Application is listening on port 3000, or whatever.");
});
