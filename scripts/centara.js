module.exports = async(page, website) => {
    // const { selectors } = website;
    await page.goto(website.url);
    await page.waitForSelector(selectors.infoContainer);
    const closePopUp = await page.$(selectors.infoPopUp);
    await closePopUp.evaluate(closePopUp => closePopUp.click());


    // const bookNow = await page.$(selectors.bookNowButton);
    // await bookNow.evaluate(bookNow => bookNow.click());
};