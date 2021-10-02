const express = require('express'); 
const { asyncSupport } = require('@codedevbrad/serverutils');

const scrape = require('./src/businessSearch');
const scrapeCategory = require('./src/categoryCrawler');

const app  = express();
const port = process.env.MICROSERVICE_PORT || 5000 ;

app.use( express.urlencoded({ extended: true }))
// parse application/json
app.use( express.json());

let delay = ms => new Promise(r => setTimeout(r, ms));



async function recursiveScrape ( url , dataObj ) {
    try {
        if ( url != 0 ) {
            
            console.log( url );    
            let { nextPage , business } = await scrape( url );
               
            nextPage = `https://www.yell.com${nextPage}`;
            dataObj.data = [ ...dataObj.data , business ];
            dataObj.crawled = dataObj.crawled + 1;
            return await recursiveScrape( nextPage , dataObj );
        } else {
            console.log('no more links');
            return dataObj;
        }
    } 
    catch( err ) {
        return dataObj;
    }
}
 

app.get('/' , asyncSupport( async ( req , res , next ) => {

    let { startUrl } = req.body;

    let points = await recursiveScrape( startUrl , { crawled: 0 , data: [] } );
    res.status(200).send( points );
}));


const categories = [ 'a' , 'b' , 'c' , 'd' , 'e' , 'g' , 'h' , 'i' ,'j' , 'k' , 'l' , 'm' , 
                     'n' , 'o' , 'p' , 'q' , 'r' , 's' , 't' , 'u' , 'v' , 
                     'w' , 'x' , 'y' , 'z' 
                   ];



function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
    per_page = per_page_items || 10,
    offset = (page - 1) * per_page,

    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      paginateLetters: paginatedItems
    };
}


async function categoryScrape ( pageLetters ) {

    let category_data = [ ];

	try {
        
        for ( i = 0; i <= pageLetters.length - 1; i++ ) {

            let currLetter = pageLetters[ i ];

            let link = `https://www.yell.com/k/popular+searches-${ currLetter }.html`;

            console.log( link );

            let business_scraped = await scrapeCategory( `https://www.yell.com/k/popular+searches-${ currLetter }.html` );
            category_data.push( business_scraped );
            await delay( 3000 );
        }

        return category_data;
    } 
    catch ( err ) {
        console.log( err );
    }
}


app.get('/categories' , asyncSupport( async ( req , res , next ) => {
    let { page } = req.query;

    if ( page > 9 ) res.status( 501 ).send({ error: 'page number exceeds pagination' });

    let { paginateLetters } = paginator( categories , page , 3 );

    let scraped = await categoryScrape( paginateLetters );
    res.status(200).send( scraped );
}));


app.listen(port, () => {
    console.log(`writable service running`);
});