// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * they also have a number for how many times they've played and one for how many times they've won.
const User = new mongoose.Schema({
username:String,
hash: String,
  timesWon: Number,
  displayName: String,
  salt: String,
  winstreak: Number
});


const Actor = new mongoose.Schema({
num: Number,
name: String
});
mongoose.model('User',User);
mongoose.model('Actor',Actor);

mongoose.connect(process.env.MONGODB_URI);

//process.env.MONGODB_URI

