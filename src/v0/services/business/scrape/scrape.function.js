const yelpRequest = require('./scrape.request');
const { delay } = require('../../util');

/*
    purpose: scrape a business page url and recursively sift through each next page.
     to add:
        * i need a starting url for business's in a category.
            * start by passing the category 
               *  example - https://www.yell.com/s/abattoirs-uk.html
*/


async function getBusinessPageData ( url , dataObj ) {
    try {
            let { nextPage , pageData } = await yelpRequest( url );

             console.log('url:' , url  , 'nextpage: ' , nextPage );
            
            dataObj.data = [ 
                ...dataObj.data , 
                { url: url , pageData }
            ];
            dataObj.crawled = dataObj.crawled + 1;

            if ( !nextPage ) {
                return dataObj;
            } else {
                nextPage = `https://www.yell.com${nextPage}`;
                await delay( 2500 );
                return await getBusinessPageData( nextPage , dataObj );
            }
    } 
    catch( err ) {
        return dataObj;
    }
}


async function getBusinessDataMultiple ( businessCategories ) {
    let categoryBusiness_data = [ ];

	try {
        for ( i = 0; i <= businessCategories.length - 1; i++ ) {

            let currCategory = businessCategories[ i ];
            
            console.log(`category ${ currCategory }`);
            
            let scrapedBusinesses = await getBusinessPageData( 
                currCategory , 
                { crawled: 0 , data: [] } 
            );
            categoryBusiness_data.push( scrapedBusinesses );

            await delay( 5000 );
        }
        return categoryBusiness_data;
    } 
    catch ( err ) {
        console.log( err );
    }
}


module.exports = {
    getBusinessPageData , getBusinessDataMultiple
}