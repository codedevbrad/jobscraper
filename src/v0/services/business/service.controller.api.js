const { getBusinessDataMultiple } = require('./scrape/scrape.function');
const { asyncSupport } = require('@codedevbrad/serverutils');

module.exports.getBusiness = asyncSupport( async ( req , res , next ) => {
    let { categories } = req.body;

    let scraped = await getBusinessDataMultiple( categories );
    res.status(200).send( scraped );
});

module.exports.businessImages = asyncSupport( async ( req , res , next ) => {
    res.status(200).send( 'hey' );
});