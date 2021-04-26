const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const x = 1;
const User = mongoose.model('User');
const sessionOptions = {
    secret: 'secret',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

var unirest = require("unirest");
var req = unirest("GET", "https://movie-database-imdb-alternative.p.rapidapi.com/");
/*Query Format
req.query({
	"s": "movietitle",
	"page": "pagenumber",
	"y": "yearofrelease",
	"type": "type of result",
	"r": "data format"
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get("/setdisplay",function(req,res)
{
  res.render('add.hbs');
});

app.get("/setbackground",function(req,res)
{
  res.render('setbackground.hbs');
});

app.post("/setbackground",function(req,res)
{
  User.updateOne({},{backGround:req.body.color},function(err,obj)
  {
  //  console.log("success");
  });

  switch(req.body.color)
  {
    case "White":
      req.body.colorVal = '#ffffff';
      break;
    case "Yellow":
      req.body.colorVal = '#ffff00';
    break;
    case "Blue":
      req.body.colorVal = '#66ffff';
    break;
    case "Green":
      req.body.colorVal = '#99ff66';
    break;
    case "Gray":
      req.body.colorVal = '#D0D4D4';
    break;
  }

console.log(req.body.colorVal);
  User.updateOne({},{colorcode:req.body.colorVal},function(err,obj)
  {
  //  console.log("success");
  });

  res.redirect("/confirm");
});

app.get("/confirm",async function(req,res)
{
  const result = await resolveAfter2Seconds();

  User.find({},function(err,data)
  {
    console.log(data);
    
    res.render("confirm.hbs",{movie:data});

  });

});
app.get("/getdisplay",async function(req,res)
{
  const result = await resolveAfter2Seconds();
  User.find({},function(err,data)
  {
    res.render("mymovies.hbs",{movie:data});

  });
  

});


app.post('/setdisplay',function(req,res)
{ 
  let testme;
  let stop = 1;
  console.log(req.body.newName);
  
  User.findOne({},function(err,data)
  {
    console.log(data);
  })
  User.updateOne({},{displayName:req.body.newName},function(err,obj)
  {
    console.log("success");
  });
  res.redirect("/getdisplay");
});


 function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 100);
  });
}


app.listen(process.env.PORT);
