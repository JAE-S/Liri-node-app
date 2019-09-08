# Liri-node-app

Liri is a CLI app that serves as a Language Interpretation and Recognition Interface.

   
   ### How It Works
    - Liri will take in 4 commands: 
        - concert-this 
        - spotify-this-song
        - movie-this
        - do-what-it-says

    - 3 commands will require a user input value: 
        - concert-this  >>  An artist or band's name
        - spotify-this-song  >>  An artist or band's name
        - movie-this  >>  A movie title 

        - These 3 commands will use the following APIs: 
            - Spotify: for songs 
            - Bands in Town: for concert details
            - OMDB: for movies

    - The fourth command will edit the text in random.txt: 
        - Liri will take the text inside of random.txt and then use it to call one of LIRI's commands.

    ### Technology Used

    - The Axios node package was used to retrieve data from the APIs listed above 
    - Moment was used to format dates 
    - Dotenv was used to get and set Environmental Variables to the Global process.env object
    - Chalk was used to colorize command line arguments 
    - Wrap-Ansi was used to wrap text in the command line 

# DEMO VIDEO 

The video below shows a breakdown of the code and Liri in action. To skip to Liri in action begin at 2:10. This video was created using after effects. 

[![Liri Bot Demo Video](http://img.youtube.com/vi/auto2MgNMTs/0.jpg)](http://www.youtube.com/watch?v=auto2MgNMTs "Liri Bot Demo Video")
