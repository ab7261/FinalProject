const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const MovieDB = require('node-themoviedb');
const mdb = new MovieDB('637ef235f46d7e960356aa83784bc471');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const x = 1;
const User = mongoose.model('User');
const Actor = mongoose.model('Actor');
const sessionOptions = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:process.env.MONGODB_URI}) 
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static(path.join(__dirname)));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("hello");
      User.findOne({ username: username })
          .then((user) => {
              if (!user) { return done(null, false) }
              console.log(password);
              console.log(user.salt);

              bcrypt.hash(password, user.salt, function(err, hash) {
                console.log(hash);
                if(hash===user.hash)
                return done(null,user);
                else
                return done(null,false);         
                });
          })
          .catch((err) => {   
              done(err);
          });
}));
//below two methods copied from https://gist.github.com/FBosler/513a0f5f845fbf6e937ab768ed88e183#file-passport_local_strategy-js
passport.serializeUser((user, done) => {
  done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
  done(err, user);
  });
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/",function(req,res)
{
  console.log(req.user);
  
  let pass= false;
  if(req.user)
pass=true;

console.log(pass);
  res.render("HomePage.hbs",{movie:pass});
});



app.get("/reset",function(req,res)
{
  if(req.user)
  {
    User.updateOne({username:req.user.username},{winstreak:0},function(err,obj)
    {

    });

  }

  res.redirect("/");
});

app.get("/login",function(req,res)
{
  if(req.user)
  res.redirect("/");

  res.render('login.hbs');
});

app.get("/register",function(req,res)
{
  if(req.user)
  res.redirect("/");

  res.render('register.hbs');
});



const saltRounds = 10;
app.post("/login",passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/' }), (err, req, res, next) => {
  if (err) next(err);
});







app.post("/register",function(req,res)
{
let username = req.body.username;
let pword = req.body.password;

let redundant = User.find({username:username}, async function(err,data)
  {
    if(data.length!==0)
    {
      res.redirect("/register");
    }
    else
    {
      let newsalt = await bcrypt.genSalt(10);
     pword = await bcrypt.hash(pword, newsalt)

     console.log(newsalt);
     console.log(pword);
        const create = new User({
          username:req.body.username,
          hash: pword,
          salt: newsalt,
          displayName: "",
          winstreak: 0,
          timesPlayed: 0,
          timesWon: 0
        });

        create.save();

      res.redirect("/login");
    }
    

  });
  





});


app.get("/gamepage",async function(req,res)
{

  const actorone = Math.floor(Math.random()*20);

  let actortwo = Math.floor(Math.random()*20);


  while(actortwo===actorone)
  {
    actortwo = Math.floor(Math.random()*20);
  }

let firstname = await Actor.find({num:actorone});
console.log()
firstname = (Array.from(firstname)[0].name);

let secondname = await Actor.find({num:actortwo});

secondname = Array.from(secondname)[0].name;

let film = {
  actorone:firstname,
  actortwo:secondname
};



  res.render("gamepage.hbs",{movie:film});
});


app.post("/gamepage", async function(req,res)
{
  const obj = JSON.stringify(req.body);
  const aa = JSON.parse(obj);
    const og = aa.og.toLowerCase();
    const actor = aa.actor.toLowerCase();
    const cactor = aa.cactor.toLowerCase();
    const movie = aa.movie;

    console.log(movie);
    const args = {
      query: {
        query: movie
      },
    };

    
   const result = await mdb.search.movies(args);
   const string = JSON.stringify(result);
   const obby = JSON.parse(string);
   let id = -1;
   console.log(obby.data.results[0].title);

   for(let i = 0; i<obby.data.results.length;i++)
   {
   if(obby.data.results[i].title.toLowerCase()===movie.toLowerCase())
   {
     id =obby.data.results[i].id;
   }
  }

   if(id!==-1)
   {
    const args = {
      pathParameters: {
        movie_id: id
      },
    };

    const cast = await mdb.movie.getCredits(args);

    const list = cast.data.cast;
    console.log(actor);
    console.log(cactor);
    function isActor (val)
    {
      const check = val.name.toLowerCase();
    

      if(check===actor||check===cactor)
      {
        return true;
      }

    }

    const finalList = list.filter(isActor);
    console.log(finalList.length);

    if(finalList.length===2)
    {
      if(actor===og)
      {
        res.send("3");
       

        if(req.user)
        {
           console.log("blabla")
          console.log(req.user);
          const nom = req.user.username;
          User.updateOne({username:req.user.username},{timesWon:req.user.timesWon+1,winstreak:req.user.winstreak+1},function(err,obj)
          {
            console.log("success");
          });
          const result = await resolveAfter2Seconds();
          console.log(req.user);
  
        }
      }
      else
      {
        res.send("2");
      }
    }
    else
    {
      res.send("1");

    }
    
   }

   else
   {
    res.send("1");
   }




});



app.get("/setdisplay",function(req,res)
{
  if(!req.user)
  res.redirect("/");

  res.render('add.hbs');
});

app.get("/logout",function(req,res)
{
  if(!req.user)
  res.redirect("/");

  req.logOut();

  res.redirect("/");

});


app.get("/profile", async function(req,res)
{

  if(!req.user)
  res.redirect("/");

  res.render("profile.hbs",{user:req.user});
});

app.get("/profile:reset",async function(req,res)
{

 User.updateOne({username:req.user.username},{winstreak:0},function(err,obj)
  {
    console.log("success");
  });
  const result = await resolveAfter2Seconds();

  

});





app.post('/setdisplay',async function(req,res)
{ 
  User.updateOne({username:req.user.username},{displayName:req.body.newName},function(err,obj)
  {
    console.log("success");
  });
  const result = await resolveAfter2Seconds();
  res.redirect("/profile");
});


 function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 100);
  });
}


app.listen(process.env.PORT);
