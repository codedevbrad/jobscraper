const Category = require('../services/categories/database/db.model');

const letters  = [ 
    'a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g' ,
    'h' , 'i' , 'j', 'k', 'l' , 'm', 'm', 'o',
    'p' , 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z'
];


const cleanDb = async ( ) => {
    return Category.deleteMany({});
}

const generateCategoryLetters = async ( ) => {
    letters.forEach( ( letter ) => {
        try {
            const newDetail = new Category( { letter , data: [ ] } );
            await newDetail.save( );
        } catch {
            return;
        } 
    });
}

module.exports = {
    cleanDb, generateCategoryLetters
}