const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.condadohotel.com');

    const closePopUp = await page.$('#popmake-3473 > button');
    await closePopUp.evaluate(closePopUp => closePopUp.click());

    await page.$eval('#datein', el => el.value = '10-09-2021');
    await page.$eval('#dateout', el => el.value = '13-09-2021');
    await page.$eval('#adults', el => el.value = '2');

    const bookIn = await page.$('#bookingBtn');
    await bookIn.evaluate(bookIn => bookIn.click());



    // await browser.close();
})();