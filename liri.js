// Get and Set Environmental Varibales to the Global process.env object
require("dotenv").config();

// File System 
    var fs = require("fs"); 

// Axios 
    axios = require('axios');
   
// Moment
    var moment = require('moment');

// Chalk
    const chalk = require('chalk');
    const log = console.log;
    // Purple
    var title_1 = chalk.rgb(146, 39, 143); 
    // Pink
    var title_2 = chalk.rgb(236, 0, 140);
    // Yellow
    var title_3 = chalk.rgb(253, 237, 64);
    // Cyan
    var titleCommand = chalk.rgb(45, 214, 225).bold;
    // Cyan - dim
    var bodyText = chalk.rgb(45, 214, 225);
    // red - error
    var error = chalk.redBright;

// Wrap-ansi
    const wrapAnsi = require('wrap-ansi');
 
// Spotify Variables 
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    // log(spotify);

// User Input Variables 
    var option = process.argv[2]
    var action = process.argv[3]
    var input = process.argv.splice(3).join(' ');
    // log(action);

    // Calls userInput function 
    userInput(option, input);

    // Switch statement based on Liri commands 
    function userInput(option, input){
        switch (option) {
            case 'concert-this':
            concertInfo(input);
            break; 
           
            case 'spotify-this-song': 
            songInfo(input);
            break; 
           
            case 'movie-this': 
            movieInfo(input); 

            break; 

            case 'do-what-it-says':
            showInfo();
            break; 

            default: 
            log("Invalid");
        }
    }    
  


    // node liri.js concert-this <artist/band name here>
    function concertInfo(input){

        if (!input){

            var concert = 
                error("\n -" + titleCommand("| CONCERT-THIS |") + "---------------------------------------------------" + "\n" +
                     "\n >>>  Please enter an artist's name to continue.  <<<\n" + "\n" + "--------------------------------------------------------------------\n");
            log(wrapAnsi(concert, 68));

        } else {
                axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function(response){
                // If the axios was successful.. 
                for (var i = 0; i < response.data.length; i++) {
                    var info = response.data
                    var date = info[i].datetime;

                    // Stores data from the bandsintown API 
                    var concert = 
                        title_1("\n -") + titleCommand("| CONCERT-THIS |") + title_1("---------------------------------------------------\n") +
                        title_1("\n * Artist: ") +  bodyText(input) +
                        title_1("\n * Venue Name: ") +  bodyText(info[i].venue.name) + 
                        title_1("\n * Venue Location: ") +  bodyText(info[i].venue.city + ", " + info[i].venue.country) +
                        // Grabs the stored data from the date variable and reformats it using moment
                        title_1("\n * Date of the Event: ") +  bodyText(moment(date).format("LLLL") + "\n" + "\n") +
                        title_1("--------------------------------------------------------------------\n"); 
                    
                    // Logs and separates the concert data colorfully with Chalk 
                    log(wrapAnsi(concert, 70));
                
                    var concert_log = 
                        "\n -| CONCERT-THIS |----------------------------------------------------\n" +
                        "\n * Artist: " + input +
                        "\n * Venue Name: " + info[i].venue.name + 
                        "\n * Venue Location: " + info[i].venue.city + ", " + info[i].venue.country +
                        // Grabs the stored data from the date variable and reformats it using moment
                        "\n * Date of the Event: " + moment(date).format("LLLL") + "\n" + 
                        "\n--------------------------------------------------------------------\n"; 
                    
                    // Appends the concert information to the log.txt file 
                    fs.appendFileSync("log.txt", concert_log, (err) => {
                        if (err) throw err;
                    });
                }
            })
            
            .catch(function(err) {
                log(err);
            });
        }

    }

    // node liri.js spotify-this-song '<song name here>'
    function songInfo(input){

        if(!input){
        // If no input data has been entered... default to The Sign by Ace of Base 
            spotify
                // The request method for the spotify API for the id of The Sign by Ace of Base 
            .request('https://api.spotify.com/v1/tracks/6kWJvPfC4DgUpRsXKNa9z9')
            .then(function(response) {
                // log(response);
                
                // This function will only run once 
                for (var a = 0; a < 1; a++){

                        // Stores data from the Spotify API 
                    var spotifySearch = 
                        title_2("\n -") + titleCommand("| SPOTIFY-THIS-SONG |") + title_2("-----------------------------------------------------------------------------------------------------\n") +
                        title_2("\n * Artist(s): ") + bodyText(response.artists[0].name)  +
                        title_2("\n * Song Title: ") + bodyText("The Sign ") + 
                        title_2("\n * Album Title: ") + bodyText(response.album.name) +
                        title_2("\n * Listen Here: ") + bodyText(response.preview_url) + "\n" + "\n" +
                        title_2(("---------------------------------------------------------------------------------------------------------------------------") + "\n");
                
                    // Logs and separates the song data colorfully with Chalk
                    log(wrapAnsi(spotifySearch, 124))

                    var spotifySearch_log = 
                    "\n -| SPOTIFY-THIS-SONG |------------------------------------------------------------------------------------------------------\n" +
                    "\n * Artist(s): " + response.artists[0].name  +
                    "\n * Song Title: " + "The Sign " + 
                    "\n * Album Title: " + response.album.name +
                    "\n * Listen Here: " + response.preview_url + "\n" + 
                    "\n-----------------------------------------------------------------------------------------------------------------------------\n";

                    // Appends the song's information to the log.txt file 
                    fs.appendFileSync("log.txt", spotifySearch_log, (err) => {
                        
                        if (err) throw err;

                    });
                }
            })

        } else {
        // If input data is entered... run the following code
            spotify
                // Search parameters 
            .search({ type: 'track', query: input})
            .then(function(response) {
            // log(response);
                
                // This function will return the 5 best match to the user's input 
                for (var i = 0; i < 5; i++) {

                    preview = response.tracks.items[i].preview_url;
                    // If the spotify API does not include a preview link, redirect users to the album 
                    if (preview === null ){
                        preview = ("Preview unavailable. To view the album, copy the link below into a browser." + "\n" + " >> " + response.tracks.items[i].album.uri) ;
                    } else {
                        preview = response.tracks.items[i].preview_url;
                    }

                    // Stores data from the Spotify API 
                    var spotifySearch = 
                        title_2("\n -") + titleCommand("| SPOTIFY-THIS-SONG |") + title_2("------------------------------------------------------------------------------------------------------\n") +
                        title_2("\n * Artist(s): ") + bodyText(response.tracks.items[i].artists[0].name)  +
                        title_2("\n * Song Title: ") + bodyText(response.tracks.items[i].name) + 
                        title_2("\n * Album Title: ") + bodyText(response.tracks.items[i].album.name) +
                        title_2("\n * Listen Here: ") + bodyText(preview + "\n") +
                        title_2("\n----------------------------------------------------------------------------------------------------------------------------\n");

                    // Logs and separates the song data colorfully with Chalk
                    log(wrapAnsi(spotifySearch, 124));

                    var spotifySearch_log = 
                    "\n -| SPOTIFY-THIS-SONG |------------------------------------------------------------------------------------------------------\n" +
                    "\n * Artist(s): " + response.tracks.items[i].artists[0].name  +
                    "\n * Song Title: " + response.tracks.items[i].name + 
                    "\n * Album Title: " + response.tracks.items[i].album.name +
                    "\n * Listen Here: " + preview + "\n" +
                    "\n-----------------------------------------------------------------------------------------------------------------------------\n";

                    // Appends the song's information to the log.txt file 
                    fs.appendFileSync("log.txt", spotifySearch_log, (err) => {
                        if (err) throw err;
                    });
                }
            })
    
            .catch(function(err) {
                log(err);
            });
    
        }
    }

    // node liri.js movie-this '<movie name here>'
    function movieInfo(input) {
         
        if(!input){
        // If no input data has been entered... default to Mr. Nobody
            axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy").then(function(response){
            // log(response.data); 

                // Stores data from the omdb API 
                var movieSearch = 
                    title_3("\n -") + titleCommand("| MOVIE-THIS |") + title_3("-----------------------------------------------------------------------------------------------------------\n") +
                    title_3("\n If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + titleCommand.underline("\n" + "\n _____It's on Netflix!_____\n")) +
                    title_3("\n * Movie Title: ") + bodyText(response.data.Title) +
                    title_3("\n * Plot: ") + bodyText(response.data.Plot) + 
                    title_3("\n" + "\n * Actors: ") + bodyText(response.data.Actors) + 
                    title_3("\n * IMDB Rating: ") + bodyText(response.data.imdbRating) +
                    title_3("\n * Rotten Tomatoes Rating: ") + bodyText(response.data.Ratings[1].Value) +
                    title_3("\n * Release Date: ") + bodyText(response.data.Released) + 
                    title_3("\n * Language(s): ") + bodyText(response.data.Language) + 
                    title_3("\n * Production Location(s): ") + bodyText(response.data.Country) + "\n" +
                    title_3("\n--------------------------------------------------------------------------------------------------------------------------\n");

                // Logs and separates the movie data colorfully with Chalk
                log(wrapAnsi(movieSearch, 124));

                // Stores data from the omdb API 
                var movieSearch_log = 
                "\n -| MOVIE-THIS |-------------------------------------------------------------------------------------------------------------\n" +
                "\n If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\n" + "\n It's on Netflix!\n" +
                "\n * Movie Title: " + response.data.Title +
                "\n * Plot: " + response.data.Plot + 
                "\n" + "\n * Actors: " + response.data.Actors + 
                "\n * IMDB Rating: " + response.data.imdbRating +
                "\n * Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\n * Release Date: " + response.data.Released + 
                "\n * Language(s): " + response.data.Language + 
                "\n * Production Location(s): " + response.data.Country + "\n" +
                "\n-----------------------------------------------------------------------------------------------------------------------------\n";
        
                // Appends the movie's information to the log.txt file 
                fs.appendFileSync("log.txt", movieSearch_log, (err) => {
                    if (err) throw err;
                });
            })
            
        } else {
        // If input data is entered... run the following code 
            axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(function(response){
            // log(response.data); 

                // Stores data from the omdb API - this variable will appear in the terminal
                var movieSearch = 
                    title_3("\n -") + titleCommand("| MOVIE-THIS |") + title_3("-----------------------------------------------------------------------------------------------------------\n") +
                    title_3("\n * Movie Title: ") + bodyText(response.data.Title) +
                    title_3("\n * Plot: ") + bodyText(response.data.Plot) + 
                    title_3("\n" + "\n * Actors: ") + bodyText(response.data.Actors) + 
                    title_3("\n * IMDB Rating: ") + bodyText(response.data.imdbRating) +
                    title_3("\n * Rotten Tomatoes Rating: ") + bodyText(response.data.Ratings[1].Value) +
                    title_3("\n * Release Date: ") + bodyText(response.data.Released) + 
                    title_3("\n * Language(s): ") + bodyText(response.data.Language) + 
                    title_3("\n * Production Location(s): ") + bodyText(response.data.Country) + "\n" + 
                    title_3("\n---------------------------------------------------------------------------------------------------------------------------\n");
                    
                    // Stores data from the omdb API - this variable will appear in the lox.txt file
                    var movieSearch_log = 
                    "\n -| MOVIE-THIS |-------------------------------------------------------------------------------------------------------------\n" +
                    "\n * Movie Title: " + response.data.Title +
                    "\n * Plot: " + response.data.Plot + 
                    "\n" + "\n * Actors: " + response.data.Actors + 
                    "\n * IMDB Rating: " + response.data.imdbRating +
                    "\n * Rotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\n * Release Date: " + response.data.Released + 
                    "\n * Language(s): " + response.data.Language + 
                    "\n * Production Location(s): " + response.data.Country + "\n" + 
                    "\n-----------------------------------------------------------------------------------------------------------------------------\n";
              
                // Logs and separates the movie data colorfully with Chalk
                log(wrapAnsi(movieSearch, 124));

                // Appends the movie's information to the log.txt file 
                fs.appendFileSync("log.txt", movieSearch_log, (err) => {
                    // throws an error, you could also catch it here
                    if (err) throw err;
                
                });

            })

            .catch(function(err) {
                log(err);
            });
            
        } 
    }

    // node liri.js do-what-it-says
    function showInfo(){ 

        var dataArr;

        // Appends a band for the concert-this function & a movie for the movie-this function to the random.text file
        fs.appendFileSync("random.text", ",concert-this,The Japanese House,movie-this,Big Daddy", "utf8", function(err) {
            if (err) {
                return log(err);
            }
            // log("movie-this was updated!")
        })

        // Reads the random.text file 
        fs.readFile("random.text", "utf8", function(err, data) {
            if (err) {
                return log(err);
            }
            // Splits the option / input data  
            dataArr = data.split(',');
            // Identifies the index of each item in the arr and assigns them as option or input so they can be run by the corresponding command.
            userInput(dataArr[0], dataArr[1]);
            userInput(dataArr[2], dataArr[3]);
            userInput(dataArr[4], dataArr[5]);
        })
    }
