const puppeteer  = require('puppeteer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.cloud_name, 
    api_key:    process.env.cloud_key , 
    api_secret: process.env.cloud_secret
});


function uploadScreenshot ( screenshot ) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "job_scraper" , use_filename: true }, (error, result) => {
                if (error) reject(error)
                else resolve(result);
        }).end(screenshot);
    });
}

async function MobileScreenshot ( page , url ) {
    const iPhone = puppeteer.devices['iPhone 11'];
    await page.emulate( iPhone );
    let mobile = await page.screenshot({ path: `${ url }__mobile.png` , encoding: 'binary' });
    return uploadScreenshot( mobile )
            .then( image => image.url )
            .catch(  err => console.error( err ));
} 

async function DesktopScreenshot ( page , url ) {
    await page.setViewport( { width:1920, height:1080 });
    let desktop = await page.screenshot({ path:  `${ url }__desktop.png` , encoding: 'binary' });
    return uploadScreenshot( desktop )
            .then( image => image.url )
            .catch(  err => console.error( err ));
} 

( async ( url ) => {
    const browser = await puppeteer.launch({
        defaultViewport: { width: 1920 , height: 1080 }
    });
    const page = await browser.newPage();
    await page.goto( url );
   
    let desktop = await DesktopScreenshot( page , 'lake_ref' ); 
    let mobile  = await MobileScreenshot(  page , 'lake_ref' );

    console.log( {
        desktop , mobile , 
        data: { url }
    });

    await browser.close();
} )( );