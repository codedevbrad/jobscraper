const mongoose = require('mongoose');

const CategoryChildSchema = new mongoose.Schema ({
  title:        { type: String  , required: true } ,
  lastscraped:  { type: Date    , required: false } 
});

const CategorySchema = new mongoose.Schema ({
  letter: { type: String  , required: true } ,
  data:   [ CategoryChildSchema ]
});

module.exports = Categories = mongoose.model( 'alphabet', CategorySchema );