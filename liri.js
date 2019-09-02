require("dotenv").config();

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);
console.log(spotify);

// commands for LIRI BOT to take in 
    // 1. concert-this
    // 2. spotify-this-song
    // 3. move-this
    // 4. do-what-it-says

// Each command should do: 

    // 1. node liri.js concert-this <artist/band name here>
        // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
            // 1. Name of the venue
            // 2. Venue location
            // 3. Date of the Event (use moment to format this as "MM/DD/YYYY")

    // 2. node liri.js spotify-this-song '<song name here>'
        // This will show the following information about the song in your terminal/bash window
            // 1. Artist(s)
            // 2. The song's name
            // 3. A preview link of the song from Spotify
            // 4. The album that the song is from

    // 3. If no song is provided then your program will default to "The Sign" by Ace of Base.


    // 4. node liri.js movie-this '<movie name here>'
        // This will output the following information to your terminal/bash window:
        // 1. Title of the movie.
        // 2. Year the movie came out.
        // 3. IMDB Rating of the movie.
        // 4. Rotten Tomatoes Rating of the movie.
        // 5. Country where the movie was produced.
        // 6. Language of the movie.
        // 7. Plot of the movie.
        // 8. Actors in the movie.
     
    // 5. If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        // 1. If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
        // 2. It's on Netflix!

    // 6. node liri.js do-what-it-says
        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        // 1. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // 2. Edit the text in random.txt to test out the feature for movie-this and concert-this.

// ------ BONUS ------ //
    // 1. In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
    // 2. Make sure you append each command you run to the log.txt file.
    // 3. Do not overwrite your file each time you run a command.