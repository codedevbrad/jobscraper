const yelpRequest = require('./scrape.request');
const { delay } = require( '../../../util');

/*
    purpose: return all letters available in alphabet after index.
*/

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


/*
    purpose: take an array of letters and scrape popular search page.
    URL scraped: https://www.yell.com/k/popular+searches-[letter].html 
*/

async function categoryNextPage ( letter , data , link ) {
    try {
        let { scraped, nextPage } = await yelpRequest( `https://www.yell.com/${ link }` );        
        
        console.log( 'category-- ' , link );

        data.push( scraped );

        if ( !nextPage ) {
            return data;
        } else {
            return await categoryNextPage( letter , data , nextPage );
        }
    }   
    catch ( err ) {
        console.log('error with fetching category data from' , link );
        console.error( err );
        return data;
    }
}


async function categoryScrape ( pageLetters ) {

    let category_data = [ ];

	try {
        for ( i = 0; i <= pageLetters.length - 1; i++ ) {

            let currLetter = pageLetters[ i ];

            let link = `k/popular+searches-${ currLetter }.html`;

            let category_scraped = await categoryNextPage( currLetter , [ ] , link );

            category_data.push( {
                  letter: currLetter, 
                    data: category_scraped
            } );
            await delay( 3000 );
        }
        return category_data;
    } 
    catch ( err ) {
        console.log( err );
    }
}


module.exports = {
    paginator , categoryScrape
}
