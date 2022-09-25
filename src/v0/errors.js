
const ErrorMessageTemplate = ( msg ) => {
    return {
        "msg": msg ,
        "portMsg": "the app doesnt seem to be working as intended. please refresh your browser."
    }
}

module.exports.errors = function( app ) {

    app.use( ( req , res , next ) => {
        res.status( 404 ).send( 'error 404');
    });
  
    // error handler
    app.use( ( err , req , res , next ) => {
       let errorMessage = ErrorMessageTemplate( err.message || err );
       console.error( 'err || err.message' );
       
       res.status( err.status || 500 );
       res.send( errorMessage );
    });
  }