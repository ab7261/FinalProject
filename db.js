// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also have a number for how many times they've played and one for how many times they've won.
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  timesPlayed:Number,
  timesWon: Number,
  displayName: String,
  backGround: String,
  colorcode: String
});
mongoose.model('User',User);

mongoose.connect(process.env.MONGODB_URI);

//process.env.MONGODB_URI

//db.User.insert({timesPlayed:0,timesWon:0,displayName:"test"})

// TODO: add remainder of setup for slugs, connection, registering models, etc. below