const { asyncSupport } = require('@codedevbrad/serverutils');
const { cleanDb, generateCategoryLetters } = require('./setup.functions');

module.exports.cleanDatabase = asyncSupport( async ( req , res ) => {
    await cleanDb(); 
    res.status(200).send( 'database cleaned' );
});

module.exports.setupCategoryDB = asyncSupport( async ( req , res ) => {
    await cleanDb();
    await generateCategoryLetters();
    res.status(200).send( 'categories in db generated' );
});