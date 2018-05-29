var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var houseController = require('./server/controllers/house-controller.js');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://wesborland1234:vcr357@ds135750.mlab.com:35750/housecomparerdb";
var mongodb = require('mongodb');

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
  console.log(req.body.name);
  db.collection('houses').findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
        address: req.body.address,
        belmar: req.body.belmar,
        mountainside: req.body.mountainside,
        tomsRiver: req.body.tomsRiver,
        station: req.body.station,
        toTrain: req.body.toTrain,
        newYork: req.body.newYork}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.get('/house/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.collection('houses').findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

