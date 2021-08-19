module.exports = async(page, website) => {
    const { selectors } = website;
    await page.goto(website.url);
    const closePopUp = await page.$(selectors.infoPopUp);
    await closePopUp.evaluate(closePopUp => closePopUp.click());
    await page.$eval(selectors.checkIn, el => el.value = '10-09-2021');
    await page.$eval(selectors.checkOut, el => el.value = '13-09-2021');
    await page.$eval(selectors.guests, el => el.value = '2');
    const bookIn = await page.$(selectors.bookInButton);
    await bookIn.evaluate(bookIn => bookIn.click());

    console.log('if you want to scrape information from this search, you need to write your code first');

};