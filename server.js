var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var houseController = require('./server/controllers/house-controller.js');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb";
var mongodb = require('mongodb');

var Zillow = require('node-zillow'); 
//Instantiate
var zillow = new Zillow('X1-ZWz1ggai24ki6j_5b1bv', {https: true});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

//Connect to Mongo
var db;

MongoClient.connect(MongoUrl, (err, client) => {
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
app.post('/house', function (req, res) {
  console.log(req.body);
  db.collection('houses').insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/house/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection('houses').remove({_id: new mongodb.ObjectID(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/house/:id', function (req, res) {
  var id = req.params.id;
  db.collection('houses').updateOne({_id: new mongodb.ObjectID(id)},
    {$set: {
        address: req.body.address,
        belmar: req.body.belmar,
        mountainside: req.body.mountainside,
        tomsRiver: req.body.tomsRiver,
        station: req.body.station,
        toTrain: req.body.toTrain,
        newYork: req.body.newYork}}, 
	function (err, doc) {
      res.json(doc);
    }
  );
});

app.get('/house/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection('houses').findOne({_id: new mongodb.ObjectID(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/zhouse', function (req, res) {    
    var parameters = {
        zpid: 92365291
    };
    zillow.get('GetZestimate', parameters)
    .then(function(results) {
        res.json(results);
    // results here is an object { message: {}, request: {}, response: {}} 
    })
});

