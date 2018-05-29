var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var houseController = require('./server/controllers/house-controller.js');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb";

app.use(express.static(__dirname + "/public"));

app.use(bodyParser());

//Connect to Mongo
var db;

MongoClient.connect(MongoURL, (err, client) => {
    if (err) return console.log(err)
    db = client.db('housecomparerdb') // whatever your database name is
    app.listen(process.env.PORT || 3000, function(){
        console.log("Application is listening on port 3000, or whatever.");
    });
});

app.get('/house', function(req, res){
	var houseList;
	console.log("I RECIEVED THE GET REQUEST!!!!!!!!!");
    //Get houses from database
    db.collection('houses').find().toArray(function(err, results) {
        console.log(results);
        houseList = results;
        res.json(houseList);
    });
	//var houseList = [house1, house2, house3];
	
});

//mongoose.connect('mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb');


