const express  = require('express'); 
const mongoose = require('mongoose');
const app  = express();
const port = process.env._PORT || 5000 ;
const server = require('http').createServer( app );

app.use( express.urlencoded({ extended: true }))
// parse application/json
app.use( express.json());

// connect to ATLAS
mongoose.connect( process.env.DATABASE_ATLAS , { useNewUrlParser: true } )
        .then ( ()  => console.log('mongodb Connected'))
        .catch( err => console.log( err ));

app.use('/v0/api' , require('./src/v0/api' ) );

require('./src/v0/errors').errors( app );

server.listen( port, ( ) => {
    console.log(`service running on ${process.env.DATABASE_ATLAS}`);
});