// Load all Dependencies
const path = require ('path');
const express = require('express');
const ejs = require ('ejs');
const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Anime = require(`./models/Anime`);
const { request } = require ('http');

// Create an express app
const app = express();
app.set ('view engine', 'ejs')

// app.use is for using middleware
app.use(express.static(path.join(__dirname, 'public')));

// Connect to DB
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
    console.log(`404 Connection Error: ${error.message}`)
});

db.once('open', function() {
    console.log('connected to database...');

});

app.get('/', function(req, res){
  res.send('<h1>Welcome Anime list</h1><p>Enter this endpoint /api/v0/animes to see array of objects</p><p>or enter this endpoint /api/v0/animes/:id to return individualy.</p><p>Id must be 1 to 12</p>.')
});


// endpoint for all objects
// thanks Patrick!
app.get('/api/v0/animes', (req, res) => {
    Anime.find({}, (err, data) => {
      if (err) {
        res.send('Could not retrieve Anime')
      }
      else {
        res.json(data);
      }
    });
  });
  
  // endpoint for individual objects
  // Thanks Patrick!!
  app.get('/api/v0/animes/:id', (req, res) => {
    Anime.findOne({id: req.params.id}, (err, data) => {
      if (err || data===null) {
        res.send('Could not find your Anime');
        console.log(err);
      }
      else {
        res.json(data);
      }
    });
  });
  
  // Add more middleware
  app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
  });
  
  // Set port preferrence with default
  const PORT = process.env.PORT || 3000;
  
  // Start server
  app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
  });