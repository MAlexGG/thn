module.exports = async(page, website) => {
    const { selectors } = website;
    await page.goto(website.url);
    await page.waitForSelector(selectors.infoContainer);
    const closePopUp = await page.$(selectors.infoPopUp);
    await closePopUp.evaluate(closePopUp => closePopUp.click());
    alert('if you want to scrape the results you need to write your code first');
};