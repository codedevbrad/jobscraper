const { asyncSupport }   = require('@codedevbrad/serverutils');
const { categoryScrape } = require('./scrape/scrape.function');

module.exports.getCategories = asyncSupport( async ( req , res , next ) => {
    let { letters } = req.body;
    let scraped = await categoryScrape( letters || [ 'a' ] ); 
    res.status(200).send( scraped );
});