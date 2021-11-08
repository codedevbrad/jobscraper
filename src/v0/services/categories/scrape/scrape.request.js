const axios   = require("axios");
const cheerio = require("cheerio");


const insert = ( index , full , string ) => {
    if (index > 0) {
      return full.substring(0, index) + string + full.substr(index);
    }
    return string + full;
};


module.exports = async ( url ) => {
  
    async function fetchHTML(url) {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    }

    const $ = await fetchHTML( url );

    let scraped = [ ];

    $('.findLinks--item a').each( function ( item ) {

        let title = $( this ).text();
        
        // grab the link, and replace l with s in the link.

        let link = $( this ).attr('href').replace('/l/' , '');

        // insert the location into the link. uk | england | wales | scotland.

        link = insert( link.length - 5 , link , "-uk");

        scraped.push( {
            title : title.replace( /\n/g , '') , link: `https://www.yell.com/s/${ link }`
        });
    });

    let nextPage = $('a.pagination--next').attr('href');

    return { 
       scraped , nextPage
    };
};