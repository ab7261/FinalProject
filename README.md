Overview:

Connect the Stars is a web app that tests users' knowledge of contemporary films and the various actors that star in them. Users are presented with two celebrities and are challenged to connect them through their co-stars. (e.g, to connect Matt Damon and Shelley Duvall, a correct answer would be to connect Matt Damon to Jack Nicholson (co-starred in the Departed) and then to connect Jack Nicholson to Shelley Duvall (co-starred in the Shining). Registration is optional and registered users will be able to see how many times they've played and how many connections they've successfully made (will probably add other stats later).Based on feasibility, I'm also thinking of including a multiplayer mode where users can compete against each other (I'll discuss this during office hours).


Data Model:

The application will store Users along with various stats related to the User

Example User:

username:"username"
hash: //hash
timesPlayed: 40
connectionsMade:18


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
I'll be using passport for user authentication. This lowers the barrier to registration by making it more convenient and will increase the amount of registered users. Details can be found here: http://www.passportjs.org/docs/

Movie API (1 point)
I'll use an external API that accesses a movie database to validate user submissions. This allows me to check user submissions against virtually every movie made without having to store that data on the server. Details can be found here: https://rapidapi.com/rapidapi/api/movie-database-imdb-alternative

Unit Testing (3 points)
I will use Mocha for unit tests