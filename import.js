
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Import seed data
const dbSeed = require(`./seeds/animes.js`);

// Define model
const Anime = require(`./models/Anime.js`);

/*******************************/
/* Mongoose/MongoDB Connection */
/*******************************/

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to database...');

});

Anime.insertMany(dbSeed, function(error, Anime) {
  console.log('Data import completed.')
  mongoose.connection.close();
});