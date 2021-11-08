const express = require('express'); 

const app  = express();
const port = process.env._PORT || 5000 ;

app.use( express.urlencoded({ extended: true }))
// parse application/json
app.use( express.json());


app.use('/v0/api' , require('./src/v0/api' ) );

app.listen(port, () => {
    console.log(`service running on ${port}`);
});