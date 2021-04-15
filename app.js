const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sessionOptions = {
    secret: 'secret',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

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
    }, 10);
  });
}

app.get("/getdisplay",async function(req,res)
{
  const result = await resolveAfter2Seconds();
  User.find({},function(err,data)
  {

    res.render("mymovies.hbs",{movie:data});

  });
  

});

app.listen(process.env.PORT);