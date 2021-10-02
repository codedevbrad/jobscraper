const puppeteer = require('puppeteer');

describe("Device emulation in puppeteer" , ( ) => {
    let browser , page;
  
    before(async function(){
      browser = await puppeteer.launch({
        headless:false,
        slowMo:100
      })
      page = await browser.newPage()
      await page.goto("https://devexpress.github.io/testcafe/example/")
    })

    //Open the desktop view
  
   it("Desktop View",async()=>{
      await page.setViewport({width:1650, height:1050})
      await page.waitFor(5000);
    })
  
    //Open tablet view
    it("Tablet View", async()=>{
        const tablet = puppeteer.devices['iPad landscape']
        await page.emulate(tablet)
        await page.waitFor(5000);
     })
  
     //Open Mobile view
    it("Mobile  View", async()=>{
        const mobile = puppeteer.devices['iPhone X']
        page.emulate(mobile)
        await page.waitFor(5000);
       
        })
    after(async function(){
       await browser.close()
    })
});