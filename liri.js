


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
            axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(function(response){
             
                // If the axios was successful.. 
                for (var i = 0; i < response.data.length; i++) {
                    var info = response.data
                    var date = info[i].datetime;

                    // Stores data from the bandsintown API 
                    var concert = 
                        "\n" + "\n Artist: " + input +
                        "\n Venue Name: " + info[i].venue.name + 
                        "\n Venue Location: " + info[i].venue.city + ", " + info[i].venue.country +
                        // Grabs the stored data from the date variable and reformats it using moment
                        "\n Date of the Event: " + moment(date).format("LLLL") + "\n" + "\n"; 
                    
                    // Logs and separates the concert data colorfully with Chalk 
                    log( chalk.yellowBright("==============================================================") + chalk.yellowBright(concert) + chalk.yellowBright("==============================================================" + "\n"));
                
                     // Appends the concert information to the log.txt file 
                    fs.appendFileSync("log.txt", concert, (err) => {
                   
                        if (err) throw err;
                   
                    });
                }
            })
           
            .catch(function(err) {
                log(err);
            });

        }

         // node liri.js spotify-this-song '<song name here>'
        function songInfo(input){
        
            // If no input data has been entered... default to The Sign by Ace of Base 
            if(!input){

                spotify
                 // The request method for the spotify API for the id of The Sign by Ace of Base 
                .request('https://api.spotify.com/v1/tracks/6kWJvPfC4DgUpRsXKNa9z9')
                .then(function(response) {
                    // log(response);
                    
                    // This function will only run once 
                    for (var a = 0; a < 1; a++){

                         // Stores data from the Spotify API 
                        var spotifySearch = 
                            "\n" + "\n Artist(s): " + response.artists[0].name  +
                            "\n Song Title: " + "The Sign " + 
                            "\n Album Title: " + response.album.name +
                            "\n Listen Here: " + response.preview_url + "\n" + "\n";;
                    
                        // Logs and separates the song data colorfully with Chalk
                        log( chalk.cyanBright.bold("----------------------------------------------------------------------------------------------------------------------------") + chalk.cyan(spotifySearch) + chalk.cyanBright.bold("----------------------------------------------------------------------------------------------------------------------------") + "\n");

                        // Appends the song's information to the log.txt file 
                        fs.appendFileSync("log.txt", spotifySearch, (err) => {
                            
                            if (err) throw err;

                        });
                    }
                })

            // If input data is entered... run the following code
            } else {
            
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
                        preview =  ("Preview unavailable. Copy the following link into a browser to view the album: " + response.tracks.items[i].album.uri) ;
                        } else {
                            preview = response.tracks.items[i].preview_url;
                        }

                        // Stores data from the Spotify API 
                        var spotifySearch = 
                            "\n" + "\n Artist(s): " + response.tracks.items[i].artists[0].name  +
                            "\n Song Title: " + response.tracks.items[i].name + 
                            "\n Album Title: " + response.tracks.items[i].album.name +
                            "\n Listen Here: " + preview + "\n" + "\n";

                        // Logs and separates the song data colorfully with Chalk
                        log( chalk.cyanBright.bold("----------------------------------------------------------------------------------------------------------------------------") + chalk.cyan(spotifySearch) + chalk.cyanBright.bold("----------------------------------------------------------------------------------------------------------------------------") + "\n");

                        // Appends the song's information to the log.txt file 
                        fs.appendFileSync("log.txt", spotifySearch, (err) => {
                           
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
            
            // If no input data has been entered... default to Mr. Nobody
            if(!input){

                axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy").then(function(response){
                // log(response.data); 

                    // Stores data from the omdb API 
                    var movieSearch = 
                        "\n" + "\n If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + ". It's on Netflix!" + "\n" +
                        "\n Movie Title: " + (response.data.Title) +
                        "\n Plot: " + (response.data.Plot) + 
                        "\n Actors: " + (response.data.Actors) + 
                        "\n IMDB Rating: " + (response.data.imdbRating) +
                        "\n Rotten Tomatoes Rating: " + (response.data.Ratings[1].Value) +
                        "\n Release Date: " + (response.data.Released) + 
                        "\n Language(s): " + (response.data.Language) + 
                        "\n Production Location(s): " + (response.data.Country) + "\n" + "\n";

                    
                    log( chalk.magentaBright.bold("----------------------------------------------------------------------------------------------------------------------------") + chalk.magentaBright(movieSearch) + chalk.magentaBright.bold("----------------------------------------------------------------------------------------------------------------------------") + "\n");
                    
                    // Appends the movie's information to the log.txt file 
                    fs.appendFileSync("log.txt", movieSearch, (err) => {
                        
                        if (err) throw err;
                    
                    });

                })
              
            // If input data is entered... run the following code    
            } else {
                
                axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy").then(function(response){
                // log(response.data); 
 
                    // Stores data from the omdb API 
                    var movieSearch = 
                        "\n" + "\n Movie Title: " + (response.data.Title) +
                        "\n" + "\n Plot: " + (response.data.Plot) + 
                        "\n Actors: " + (response.data.Actors) + 
                        "\n IMDB Rating: " + (response.data.imdbRating) +
                        "\n Rotten Tomatoes Rating: " + (response.data.Ratings[1].Value) +
                        "\n Release Date: " + (response.data.Released) + 
                        "\n Language(s): " + (response.data.Language) + 
                        "\n Production Location(s): " + (response.data.Country) + "\n" + "\n";

                     // Logs and separates the movie data colorfully with Chalk
                    log( chalk.magentaBright.bold("----------------------------------------------------------------------------------------------------------------------------") + chalk.magentaBright(movieSearch) + chalk.magentaBright.bold("----------------------------------------------------------------------------------------------------------------------------") + "\n");
                    
                    // Appends the movie's information to the log.txt file 
                    fs.appendFileSync("log.txt", movieSearch, (err) => {
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
            fs.appendFileSync("random.text", ",concert-this,The 1975,movie-this,Catch Me If You Can", "utf8", function(err) {
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
