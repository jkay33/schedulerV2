const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const faker = require('faker');
const apptRoutes = express.Router();
const PORT = 4000;
const DB_URI = 'mongodb://mongo:27017/Appt';
const DB_URI_TEST = 'mongodb://127.0.0.1:27017/Appt';

// import model
let Appt = require('./appt.model');

app.use(cors());
app.use(bodyParser.json());

// creating connection to db, using new url parser due to deprecation
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// saving instance of db connection to 'connection'
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('Successfully connected to MongoDB');
});


// defining get request
apptRoutes.route('/').get(function(req, res){
    Appt.find(function(err, appts){
        if (err){
            return console.log(err);
        }else {
            //serve json file
            return res.json(appts);
        }
    });
});
// defining get request by id ( retrieve specific )
apptRoutes.route('/:id').get(function(req, res){
    // set id = id from parameter (":id")
    let id = req.params.id;
    // get item by id
    Appt.findById(id, function(err, appt){
        if (err){
            return res.status(400).send('not found');
        }else {
            // res set to 200 by default
            return res.json(appt);
        }
    });
});
// defining post request ( create appointments )
apptRoutes.route('/create').post (function(req, res){
    let appt = new Appt(req.body);
    appt.save()
    //async 
        .then(appt => {
            res.status(200).json({'appt': 'appointment added successfully'});
        })
        .catch(err => {
            res.status(400).send('failed')
        });

});
// defining put ( update status )
apptRoutes.route('/update/:id').put(function (req, res){
    Appt.findById(req.params.id, function (err, appt){
        //if id not found 
        if (!appt){
            return res.status(404).send(err);
        } else{
            //set status = request
            appt.appt_status = req.body.appt_status;
            appt.save()
                .then(appt =>{
                res.json('appointment updated');
                })
                .catch(err =>{
                res.status(400).send('update failed');
                });
        };
    });
});
// defining delete ( delete appointments )
apptRoutes.route('/delete/:id').delete(function(req, res){
    Appt.findByIdAndDelete(req.params.id, function(err, appt){
        if (err){
            //handling deletion error
            return res.status(400).send('delete attempt failed');
        }else {
            return res.send('deleted');
        };
    });
});
// defining get date range and sort by price -descending
apptRoutes.route('/find/desc/:min/:max').get(function(req, res){
    Appt.find({
        "appt_date" : {
            "$gte": req.params.min, 
            "$lte": req.params.max
        }
      // chaining query to sort  
    }).sort({appt_price: -1}).exec(function(err, appt){
        if (err){
            res.status(404);
        }else {
            res.json(appt);
        };
    });
});
// defining get date range and sort by price -ascending
apptRoutes.route('/find/asc/:min/:max').get(function (req, res) {
    Appt.find({
        "appt_date": {
            "$gte": req.params.min,
            "$lte": req.params.max
        }
        // chaining query to sort  
    }).sort({ appt_price: 1 }).exec(function (err, appt) {
        if (err) {
            res.status(404);
        } else {
            res.json(appt);
        };
    });
});
// defining route to import random data
apptRoutes.route('/gen/data/:num').post(function(req, res){
    // creating json array for insert
    jsonArr = [];
    // loop to create json array based on parameter from route
    for (i = 1; i <= req.params.num; i++) {
        // using faker to generate fake data
        let fakename = faker.name.firstName();
        let fakedate = faker.date.past(1);
        let fakestatus = faker.random.arrayElement([
            'active',
            'in progress',
            'complete'
        ]);
        let fakeprice = faker.random.number(40);
        // pushing data to jsonArr every iteration
        jsonArr.push({
            requestor_name: fakename,
            appt_date: fakedate,
            appt_status: fakestatus,
            appt_price: fakeprice
        });
    };
    // insert jsonArr 
    Appt.insertMany(jsonArr,function(err, appt){
        if (err){
            return res.status(400).send(err);
        }else {
            return res.status(200).send('complete');
        };
    });
});

// setting base path
app.use('/appt', apptRoutes);

app.listen(PORT, function(){
    console.log ("Backend Server is runnning on PORT: " + PORT);
});

module.exports = app;