const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const { Movies }= require("./models/movie-model");
const { Actors }= require("./models/actor-model");
app.use(morgan('dev'))
app.use(jsonParser)

/* 
    Your code goes here 
*/
app.patch('/api/add-movie-actor/:movie_ID', function (req, res) {
    let movie_ID = req.params;
    let {id, firstName, lastName} = req.body;

    if (!id) {
        res.statusMessage = "Id is missing in the body of the request."
        return res.status(406).end();
    }

    if (id !== movie_ID) {
        res.statusMessage = "id and movie_ID do not match"
        return res.status(409).end();
    }

    if (!firstName || !lastName) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list."
        return res.status(403).end();
    }

    Movies
    .getMovieById( {id: movie_ID})
    .then((movie) => {
        if (movie.length == 0) {
            res.statusMessage = "Movie No found"
            return res.status(400).end()
        }

        Actors
        .getActorByName({firstName, lastName})
        .then((actor) => {
            if (actor.length == 0) {
                res.statusMessage = "Actor no found"
                return res.status(400).end()
            }
            Movies
            addActorToMovieList( {movie_ID: actor.movie_ID}, {firstName: actor.firstName, lastName: actor.firstName} )    
            .then((result) => {
                
            }).catch((err) => {
                
            });
        }).catch((err) => {
            
        });
        
    }).catch((err) => {
        
    });
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});