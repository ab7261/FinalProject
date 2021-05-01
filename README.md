FOR GRADER:

I ran into some last minute issues with the API that I was originally planning on using for this app so I had to move some things around and some of the items on the google form may no longer apply. To make things easier, I've listed the grading criteria and linked relevant sections of code below.

FORM/AJAX  <br />
AJAX Interaction - /gamepage. This AJAX interaction provides feedback to users as they play the game and updates elements accordingly <br />
AJAX Interaction - /Profile (reset streak button) This AJAX interaction allows users to manually reset their winstreak <br />
Form Interaction - /setdisplay This form interaction allows users to set their display name <br />

FUNCTIONS <br />
This function is used to help process the server response: [click here](app.js#L258) <br />
This function is used to help validate a user's entry: [click here](index.js#L115) <br />
This higher order function is used to process a text array and extract data from it: [click here](index.js#L26) <br />

SCHEMAS <br />
[db.js](db.js) <br />

RESEARCH

Passport was used for user authentication and the relevant code is present in the app.js file
An external movie database api (TheMovieDB) was used to validate user submissions and the relevant code is present in the app.js file



Additional Notes:
There is no specific user required to test functionality, to create a new user, click the register link on the home page

The database used for this is missing some movies, mainly independent films and low budget movies so there may be some false negatives when playing the game (think of it as an additional challenge!)







Overview:

Connect the Stars is a web app that tests users' knowledge of contemporary films and the various actors that star in them. Users are presented with two celebrities and are challenged to connect them through their co-stars. (e.g, to connect Matt Damon and Shelley Duvall, a correct answer would be to connect Matt Damon to Jack Nicholson (co-starred in the Departed) and then to connect Jack Nicholson to Shelley Duvall (co-starred in the Shining). Registration is optional and registered users will be able to see how many times they've played and how many connections they've successfully made (will probably add other stats later).


Data Model:

The application will store Users along with various stats related to the User

Example User:
username:"username"
displayname:asf
hash:dfas
salt: afase
timesWon:3
winstreak:4


The example file can be found [here](db.js)

Wireframes can be found [here](Documentation)

Site Map can be found [here](PageLayout.docx)


USER STORIES
1. As a user, I want a platform where I can demonstrate my film knowledge
2. As a user, I want a quick game I can play when I'm at the airport
3. As a non-registered user, I can register a new account
4. As a registered user, I can see how many times I've played and how many times I've won

Research Topics:
User Authentication (5 points)
I'll be using passport for user authentication. 
Movie API (3 points)
I'll use an external API that accesses a movie database to validate user submissions. This allows me to check user submissions against virtually every movie made without having to store that data on the server. Details can be found here: https://www.themoviedb.org/settings/api
