const Category = require('../services/categories/database/db.model');
const { delay } = require('../util');

const letters  = [ 
    'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' ,
    'h' , 'i' , 'j', 'k', 'l' , 'm', 'm', 'o',
    'p' , 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z'
];


const cleanDb = async ( ) => {
    return Category.deleteMany({});
}


const generateCategoryLetters = async ( ) => {

    for ( var i = 0; i < letters.length; i++ ) {
        try {
            let letter = letters[ i ];
            const newDetail = new Category( { letter , data: [ ] } );
            await newDetail.save( );
            console.log( 'creating for: ' , letter );
            await delay( 75 );
        } catch ( err ) {
            console.log('error' , err );
            throw err;
        } 
    };
}

module.exports = {
    cleanDb, generateCategoryLetters
}