const Category = require('./db.model');

// GET ALL Categories.
const CategoryGETALL = ( ) => {
   return Category.find();
}

// POST CATEGORIES TO LETTER.
const CategoryPublish = async ( id, data ) => {
    Category.findOneAndUpdate( { _id : req.query.id } , { data } , { new : true } );
}

module.exports = {
    CategoryGETALL, CategoryPublish
}