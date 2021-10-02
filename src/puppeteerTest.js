 const puppeteer = require('puppeteer');

 let url = 'https://www.yell.com/ucs/UcsSearchAction.do?find=Y&keywords=accountants&location=aberdeen&pageNum=1';


 // return next page url to scrape again.

 const getPageData = async ( page ) => {
    let urls = await page.evaluate( async () => {
        let results = [];

        let items = document.querySelectorAll('.businessCapsule--mainContent');

        items.forEach((item) => {
            let urls = [ ];

            let name = item.querySelector('.businessCapsule--name').innerText;

            item.querySelectorAll(':nth-child(3) a').forEach( function ( link ) {
                urls.push( link.getAttribute('href') );
            });

            results.push({
                businessName: name , urls
            });
        });
       
        return results;
    });
    return urls;
}


module.exports = async ( url ) => {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto( url );
    
    await Promise.all([
        page.waitForNavigation(),
        page.click('.pagination--next')
    ]);
    let urls = await getPageData( page );

    await browser.close();  
    return urls;
};