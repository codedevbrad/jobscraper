
const axios = require("axios")
const cheerio = require("cheerio")


module.exports = async ( url ) => {
  
    async function fetchHTML(url) {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    }

    const $ = await fetchHTML( url );

    let scraped = [ ];

    $('.businessCapsule--mainContent').each( function ( item ) {

        let linksFound = [ ];

        let title = $( this ).find('.businessCapsule--name').text();
        
        $( this ).find(':nth-child(3) a').each( function ( ) {
              linksFound.push( $(this).attr('href'));
        });

       scraped.push( {
            title , linksFound 
       });
    });
    
    let nextPage = $('a.pagination--next').attr('href');

    return {
        business: scraped , nextPage
    };
};
